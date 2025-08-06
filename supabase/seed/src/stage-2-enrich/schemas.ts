// schemas.ts
import { z } from "zod"

import { categoriesEnum, industriesEnum } from "./prompt"

// 1. Full-detail schema (used in final enrichment)
export const strictSchema = z.object({
  category:    z.enum(categoriesEnum),
  industry:    z.enum(industriesEnum),
  codename:    z.string(),
  punchline:   z.string(),
  description: z.string(),
})

// 2. Definition-only schema (codename, punchline, description)
export const definitionSchema = z.object({
  codename:    z.string(),
  punchline:   z.string(),
  description: z.string(),
})

// 3. Filter schema for Category + Industry
export const filtersSchema = z.object({
  category: z.enum(categoriesEnum),
  industry: z.enum(industriesEnum),
})

// 4. Same filter schema used when fixing CI
export const filtersSchemaWithFixedCI = filtersSchema

// ---- Data interfaces ----
export interface RawDataItem {
  full_name:       string
  product_website: string
  codename:        string
  logo_src:        string
  punchline:       string
  description:     string
  site_content:    string
}

export interface EnrichedDataItem extends RawDataItem {
  category: string
  industry: string
}

// ---- Exposed types for tooling ----
export type DefinitionSchema = z.infer<typeof definitionSchema>
export type FiltersSchema   = z.infer<typeof filtersSchema>
