// supabase/seed/src/stage-2-enrich/enrichment.ts

import path from "path"
import dotenv from "dotenv"
import pRetry from "p-retry"
import pThrottle from "p-throttle"

import { AIClientConfig, AIModel, createAIClient } from "./ai-client"
import {
  getSimpleDetailsPrompt,
  getSimpleCategoryIndustryPrompt,
  getAIEnrichmentPrompt,
  fixCategoryIndustryPrompt,
  getFixPrompt,
} from "./prompt"
import {
  EnrichedDataItem,
  RawDataItem,
  definitionSchema,
  filtersSchema,
  filtersSchemaWithFixedCI,
  strictSchema,
} from "./schemas"

dotenv.config({ path: path.resolve(__dirname, "../../../../.env.local") })

// Counters to track model usage
export let cheapFastModelCalls = 0
export let smartModelCalls = 0

const anthropicApiKey = process.env.ANTHROPIC_API_KEY?.trim()
const openaiApiKey = process.env.OPENAI_API_KEY?.trim()

const cheapFastModelConfig: AIClientConfig = {
  provider: anthropicApiKey ? "anthropic" : "openai",
  model: anthropicApiKey
    ? AIModel.CLAUDE_3_HAIKU
    : AIModel.GPT_3_5_TURBO,
  apiKey: anthropicApiKey || openaiApiKey!,
}

const smartModelConfig: AIClientConfig = {
  provider: anthropicApiKey ? "anthropic" : "openai",
  model: anthropicApiKey
    ? AIModel.CLAUDE_3_SONNET
    : AIModel.GPT_4_TURBO,
  apiKey: anthropicApiKey || openaiApiKey!,
}

const cheapFastModel = createAIClient(cheapFastModelConfig)
const smarterModel = createAIClient(smartModelConfig)
const fallbackModel = createAIClient(smartModelConfig)

const cleanAndJoin = (content: string) =>
  content
    .replace(/\s\s+/g, " ")
    .trim()
    .split(". ")
    .map((s) => s.trim() + ".")
    .join(" ")

// Fallback: full enrichment in one go
async function enrichFallback(
  client: ReturnType<typeof createAIClient>,
  item: RawDataItem
): Promise<EnrichedDataItem> {
  const res = await client.generate(
    strictSchema,
    getAIEnrichmentPrompt(item.codename, item.description, item.site_content)
  )

  return {
    ...item,
    codename: res.object.codename,
    punchline: res.object.punchline,
    description: res.object.description,
    category: res.object.category,
    industry: res.object.industry,
  }
}

export const enrichData = (
  throttleLimit = 7,
  retryAttempts = 3
) =>
  pThrottle({ limit: throttleLimit, interval: 10000 })(
    async (item: RawDataItem): Promise<EnrichedDataItem> =>
      pRetry(
        async (attempt) => {
          console.log(`Item ${item.codename} – attempt #${attempt}`)

          if (attempt === 1) {
            return enrichTwoStep(item)
          } else if (attempt === 2) {
            return enrichWithFixPrompt(item)
          } else {
            return enrichFallback(fallbackModel, item)
          }
        },
        { retries: retryAttempts }
      )
  )

async function enrichTwoStep(
  item: RawDataItem
): Promise<EnrichedDataItem> {
  const [details, ci] = await Promise.all([
    cheapFastModel.generate(
      definitionSchema,
      getSimpleDetailsPrompt(
        item.codename,
        item.description,
        cleanAndJoin(item.site_content)
      )
    ),
    cheapFastModel.generate(
      filtersSchema,
      getSimpleCategoryIndustryPrompt(
        item.codename,
        item.description,
        cleanAndJoin(item.site_content)
      )
    ),
  ])

  let { category, industry } = ci.object

  if (!category || !industry) {
    console.log("→ CI missing, running fix")
    const fixed = await smarterModel.generate(
      filtersSchemaWithFixedCI,
      fixCategoryIndustryPrompt(ci.object)
    )
    category = fixed.object.category
    industry = fixed.object.industry
    smartModelCalls += 1
  }

  if (!category || !industry) {
    throw new Error(`CI enrichment failed for ${item.codename}`)
  }

  cheapFastModelCalls += 2

  return {
    ...item,
    codename: details.object.codename,
    punchline: details.object.punchline,
    description: details.object.description,
    category,
    industry,
  }
}

async function enrichWithFixPrompt(item: RawDataItem) {
  console.log("→ Using fixPrompt for full CI + details")
  const prompt = getFixPrompt(
    item.codename,
    item.description,
    item.site_content,
    {}
  )
  const res = await smarterModel.generate(strictSchema, prompt)
  cheapFastModelCalls += 1

  return {
    ...item,
    codename: res.object.codename,
    punchline: res.object.punchline,
    description: res.object.description,
    category: res.object.category,
    industry: res.object.industry,
  }
}
