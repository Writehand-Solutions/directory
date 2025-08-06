'use client'

import { cn, truncateString } from "@/lib/utils"
import { BoxIcon, Tag } from "lucide-react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

// --- Paste your enums here ---
const categories = [
  "lead generation",
  "content creation",
  "customer engagement",
] as const

const industries = [
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
// ---------------------------------

export function FilterDataSection() {
  const searchParams = useSearchParams()

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-6">
      {/* Categories */}
      <div className="flex flex-col items-start gap-2">
        <BoxIcon className="h-4 w-4 text-yellow-500" />
        <ul className="w-32 flex flex-col gap-2 items-start py-2">
          {categories.map((category) => (
            <li key={category}>
              <Link
                href={`/products?category=${encodeURIComponent(category)}`}
                className={cn(
                  "flex items-center text-sm font-medium rounded-md px-2 py-0.5",
                  searchParams.get("category") === category
                    ? "bg-yellow-400 text-black"
                    : "bg-white"
                )}
              >
                {truncateString(category, 12)}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Industries */}
      <div className="flex flex-col items-start gap-2">
        <Tag className="h-4 w-4 text-pink-500" />
        <ul className="w-32 flex flex-col gap-2 items-start py-2">
          {industries.map((industry) => (
            <li key={industry}>
              <Link
                href={`/products?industry=${encodeURIComponent(industry)}`}
                className={cn(
                  "flex items-center text-sm font-medium rounded-md px-2 py-0.5",
                  searchParams.get("industry") === industry
                    ? "bg-pink-400 text-black"
                    : "bg-white"
                )}
              >
                {truncateString(industry, 12)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

