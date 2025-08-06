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
  getFixPrompt,
  fixCategoryIndustryPrompt,
} from "./prompt"
import {
  EnrichedDataItem,
  RawDataItem,
  definitionSchema,
  filtersSchema,
  filtersSchemaWithFixedLabelsSchema,
  strictSchema,
} from "./schemas"

dotenv.config({ path: path.resolve(__dirname, "../../../../.env.local") })

// Export counters for model calls to track usage
export let cheapFastModelCalls = 0
export let smartModelCalls = 0

const anthropicApiKey = process.env.ANTHROPIC_API_KEY?.trim()
const openaiApiKey = process.env.OPENAI_API_KEY?.trim()

const cheapFastModelConfig: AIClientConfig = {
  provider: anthropicApiKey ? "anthropic" : "openai",
  model: anthropicApiKey
    ? ("claude-3-haiku-20240307" as AIModel)
    : ("gpt-3.5-turbo" as AIModel),
  apiKey: anthropicApiKey || openaiApiKey!,
}

const smartModelConfig: AIClientConfig = {
  provider: anthropicApiKey ? "anthropic" : "openai",
  model: anthropicApiKey
    ? ("claude-3-sonnet-20240229" as AIModel)
    : ("gpt-4-turbo" as AIModel),
  apiKey: anthropicApiKey || openaiApiKey!,
}

const cheapFastModel = createAIClient(cheapFastModelConfig)
const smarterModel = createAIClient(smartModelConfig)
const fallbackSmarterModel = createAIClient(smartModelConfig)

const cleanAndJoinContent = (content: string): string => {
  const cleaned = content.replace(/\s\s+/g, " ").trim()
  const sentences = cleaned.split(". ").map(s => s.trim() + ".")
  return sentences.join(" ")
}

// Single‐step full enrichment (used as fallback)
const enrichItem = async (
  client: ReturnType<typeof createAIClient>,
  item: RawDataItem
): Promise<EnrichedDataItem> => {
  const result = await client.generate(
    strictSchema,
    getAIEnrichmentPrompt(
      item.codename,
      item.description,
      item.site_content
    )
  )

  return {
    ...item,
    codename: result.object.codename,
    punchline: result.object.punchline,
    description: result.object.description,
    category: result.object.category,
    industry: result.object.industry,
  }
}

export const enrichData = (throttleLimit = 7, retryAttempts = 3) => {
  const throttle = pThrottle({ limit: throttleLimit, interval: 10000 })

  return throttle(async (item: RawDataItem): Promise<EnrichedDataItem> => {
    return pRetry(
      async attempt => {
        console.log(
          `Enriching item ${item.codename}, attempt #${attempt}`
        )

        if (attempt === 1) {
          return enrichItemWithSeparateRequests(item)
        } else if (attempt === 2) {
          return enrichItemWithFixPrompt(fallbackSmarterModel, item)
        } else {
          return enrichItem(fallbackSmarterModel, item)
        }
      },
      { retries: retryAttempts }
    )
  })
}

const enrichItemWithSeparateRequests = async (
  item: RawDataItem
): Promise<EnrichedDataItem> => {
  try {
    const [detailsOutput, ciOutput] = await Promise.all([
      cheapFastModel.generate(
        definitionSchema,
        getSimpleDetailsPrompt(
          item.codename,
          item.description,
          cleanAndJoinContent(item.site_content)
        )
      ),
      cheapFastModel.generate(
        filtersSchema,
        getSimpleCategoryIndustryPrompt(
          item.codename,
          item.description,
          cleanAndJoinContent(item.site_content)
        )
      ),
    ])

    let { category, industry } = ciOutput.object

    // If category or industry missing, run a fix prompt
    if (!category || !industry) {
      console.log("→ Missing category/industry; running fix prompt")
      const fixed = await smarterModel.generate(
        filtersSchemaWithFixedLabelsSchema,
        fixCategoryIndustryPrompt(ciOutput.object)
      )
      category = fixed.object.category
      industry = fixed.object.industry
      smartModelCalls += 1
    }

    // Validate that we have both values
    if (!category || !industry) {
      throw new Error(
        `Invalid category/industry after fix for ${item.codename}`
      )
    }

    cheapFastModelCalls += 2
    console.log("→ Enrichment step passed")

    return {
      ...item,
      codename: detailsOutput.object.codename,
      punchline: detailsOutput.object.punchline,
      description: detailsOutput.object.description,
      category,
      industry,
    }
  } catch (err) {
    console.error(`Separate-requests enrichment failed for ${item.codename}`, err)
    throw err
  }
}

const enrichItemWithFixPrompt = async (
  client: ReturnType<typeof createAIClient>,
  item: RawDataItem
): Promise<EnrichedDataItem> => {
  try {
    const fixPrompt = getFixPrompt(
      item.codename,
      item.description,
      item.site_content,
      {}
    )
    const result = await client.generate(strictSchema, fixPrompt)
    cheapFastModelCalls += 1

    return {
      ...item,
      codename: result.object.codename,
      punchline: result.object.punchline,
      description: result.object.description,
      category: result.object.category,
      industry: result.object.industry,
    }
  } catch (err) {
    console.error(`Fix-prompt enrichment failed for ${item.codename}`, err)
    throw err
  }
}
