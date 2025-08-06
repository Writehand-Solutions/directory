// prompts.ts

// 1. Broad Categories
export const categoriesEnum = [
  "lead generation",
  "content creation",
  "customer engagement",
] as const

// 2. Industry filter values
export const industriesEnum = [
  "marketing",
  "e-commerce",
  "SaaS",
  "human resources",
  "finance",
  "healthcare",
  "education",
  "real estate",
  "travel",
  "retail",
  "legal",
  "manufacturing",
  "non-profit",
] as const

const prepareContent = (content: string) => {
  // Remove extra spaces
  let cleanedContent = content.replace(/\s\s+/g, " ").trim()
  // Optionally, split into sentences or sections if needed
  let sentences = cleanedContent
    .split(". ")
    .map((sentence) => sentence.trim() + ".")
  return sentences.join(" ")
}

export const getSimpleDetailsPrompt = (
  name: string,
  desc: string,
  content: string
) => {
  let prompt = `
# Objective
Enrich the following product with relevant category, codename, punchline, and description.

# Examples
Example 1:
- Input
  Site Name: "PixelPerfect"
  Site Description: "A comprehensive design tool for creating pixel-perfect UI components and prototypes."
  Site Content: "PixelPerfect - Design stunning UIs - Create precise prototypes - Perfect your design workflow"
- Output
  {
    "category": "content creation",
    "codename": "Pixel Perfect UI",
    "punchline": "Perfect Your Pixels",
    "description": "A comprehensive design tool for creating pixel-perfect UI components and prototypes, enhancing your design workflow with precision."
  }

### Definitions
Categories (broad):
- ${JSON.stringify(categoriesEnum)}
Industry options:
- ${JSON.stringify(industriesEnum)}
Codename: A concise and memorable name for the product.
Punchline: A short, catchy phrase that encapsulates the product's value proposition.
Description: A brief explanation of the product, highlighting its key features and benefits.

- Input
  Site Name: "${name}"
  Site Description: "${desc}"`

  if (content) {
    prompt += `
  Site Content: "${prepareContent(content.substring(0, 300))}"`
  }

  prompt += `
- Output
`

  return prompt
}

export const getSimpleCategoryIndustryPrompt = (
  name: string,
  desc: string,
  content: string
) => {
  let prompt = `
# Objective
Enrich the following product with a relevant category and industry.

## Examples
Example 1:
- Input
  Site Name: "PixelPerfect"
  Site Description: "A comprehensive design tool for creating pixel-perfect UI components and prototypes."
- Output
  {
    "category": "content creation",
    "industry": "marketing"
  }

## Definitions
CATEGORY OPTIONS:
- ${JSON.stringify(categoriesEnum)}

INDUSTRY OPTIONS:
- ${JSON.stringify(industriesEnum)}

## Instructions
- Ensure both category and industry are lowercase.
- Choose exactly 1 category and exactly 1 industry.
- ONLY USE the provided CATEGORY and INDUSTRY options.

# Your Turn
- Input
  Site Name: "${name}"
  Site Description: "${desc}"`

  if (content) {
    prompt += `
  Site Content: "${prepareContent(content.substring(0, 400))}"`
  }

  prompt += `
- Output
`

  return prompt
}

export const fixCategoryIndustryPrompt = (
  failedOutput: any
) => {
  return `
# Objective
The previous attempt to categorize the product failed with the following output:
${JSON.stringify(failedOutput, null, 2)}

Please correct the errors so that both "category" and "industry" use only the allowed options.

## Definitions
Categories (broad):
- ${JSON.stringify(categoriesEnum)}

Industries:
- ${JSON.stringify(industriesEnum)}

## Instructions
- Ensure both category and industry are lowercase.
- Choose exactly 1 category and exactly 1 industry.
- ONLY USE the provided options.

- Output
`
}

export const getAIEnrichmentPrompt = (
  name: string,
  desc: string,
  content: string
) => {
  let prompt = `
# Objective
Enrich the following product with relevant category, industry, codename, punchline, and description.

## Instructions
- Ensure category and industry are lowercase.
- Choose exactly 1 category and exactly 1 industry.
- USE ONLY the provided options for Categories and Industries.

### Definitions
Categories (broad):
- ${JSON.stringify(categoriesEnum)}

Industries:
- ${JSON.stringify(industriesEnum)}

Codename: A concise and memorable name for the product.
Punchline: A short, catchy phrase that encapsulates the product's value proposition.
Description: A brief explanation of the product, highlighting its key features and benefits.

- Input
  Site Name: "${name}"
  Site Description: "${desc}"`

  if (content) {
    prompt += `
  Site Content: "${prepareContent(content.substring(0, 400))}"`
  }

  prompt += `
- Output
{
  "category": "",
  "industry": "",
  "codename": "",
  "punchline": "",
  "description": ""
}
`

  return prompt
}

export const getFixPrompt = (
  name: string,
  desc: string,
  content: string,
  failedOutput: any
) => {
  return `
# Objective
The previous attempt to enrich the product data failed with the following output:
${JSON.stringify(failedOutput, null, 2)}

Please fix the specific errors in the failed output—ensure "category" and "industry" use only the allowed options:
- ${JSON.stringify(categoriesEnum)}
- ${JSON.stringify(industriesEnum)}

## Instructions
- Ensure category and industry are lowercase.
- Choose exactly 1 category and exactly 1 industry.
- USE ONLY the provided options.

- Input
  Site Name: "${name}"
  Site Description: "${desc}"
  ${content ? `Site Content: "${content.substring(0, 400)}"` : ""}

- Output
{
  "category": "",
  "industry": ""
}
`
}
