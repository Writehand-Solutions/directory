// schemas.ts
import { z } from "zod"

import { categoriesEnum, industriesEnum } from "./prompt"

// Define Zod schemas for validation
export const strictSchema = z.object({
  category: z.enum(categoriesEnum),
  industry: z.enum(industriesEnum),
  codename: z.string(),
  punchline: z.string(),
  description: z.string(),
})

export const definitionSchema = z.object({
  codename: z.string(),
  punchline: z.string(),
  description: z.string(),
})

export const filtersSchema = z.object({
  category: z.enum(categoriesEnum),
  industry: z.enum(industriesEnum),
})

export const filtersSchemaWithFixedCI = z.object({
  category: z.enum(categoriesEnum),
  industry: z.enum(industriesEnum),
})

// Interfaces for raw and enriched data items
export interface RawDataItem {
  full_name: string
  product_website: string
  codename: string
  logo_src: string
  punchline: string
  description: string
  site_content: string
}

export interface EnrichedDataItem extends RawDataItem {
  category: string
  industry: string
}

export type DefinitionSchema = z.infer<typeof definitionSchema>
export type FiltersSchema = z.infer<typeof filtersSchema>

