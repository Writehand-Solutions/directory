'use client'

import { cn, truncateString } from "@/lib/utils"
import { BoxIcon, Tag } from "lucide-react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

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

export function FilterDataSection() {
  const searchParams = useSearchParams()

  return (
    // Big bottom margin = hard stop so cards can't overlap (even if they use -mt-*)
    <div className="w-full mb-10 md:mb-12 xl:mb-14">
      {/* Stack by default; only side-by-side on xl+ */}
      <div className="mt-6 flex flex-col gap-3 xl:flex-row xl:items-start xl:gap-3">
        {/* Categories */}
        <div className="xl:w-56 xl:flex-none">
          <div className="mb-2 flex items-center gap-2">
            <BoxIcon className="h-4 w-4 text-yellow-500" />
            <span className="sr-only">Categories</span>
          </div>
          <ul className="flex flex-wrap gap-1.5">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={`/products?category=${encodeURIComponent(category)}`}
                  className={cn(
                    "inline-flex items-center whitespace-nowrap rounded-md px-2 py-1 text-sm font-medium",
                    searchParams.get("category") === category
                      ? "bg-yellow-400 text-black"
                      : "bg-white"
                  )}
                >
                  {truncateString(category, 22)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Industries */}
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <Tag className="h-4 w-4 text-pink-500" />
            <span className="sr-only">Industries</span>
          </div>
          <ul className="flex flex-wrap gap-1.5">
            {industries.map((industry) => (
              <li key={industry}>
                <Link
                  href={`/products?industry=${encodeURIComponent(industry)}`}
                  className={cn(
                    "inline-flex items-center whitespace-nowrap rounded-md px-2 py-1 text-sm font-medium",
                    searchParams.get("industry") === industry
                      ? "bg-pink-400 text-black"
                      : "bg-white"
                  )}
                >
                  {truncateString(industry, 22)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
