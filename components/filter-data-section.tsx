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
    <div className="w-full mb-6"> {/* add bottom space so nothing overlaps */}
      {/* Stack by default, only side-by-side on lg+ */}
      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-3">
        {/* Categories (left) */}
        <div className="lg:w-56 lg:flex-none">
          <div className="mb-2 flex items-center gap-2">
            <BoxIcon className="h-4 w-4 text-yellow-500" />
            <span className="sr-only">Categories</span>
          </div>
          <ul className="flex flex-wrap gap-2">
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

        {/* Industries (right) */}
        <div className="flex-1 min-w-[280px]">
          <div className="mb-2 flex items-center gap-2">
            <Tag className="h-4 w-4 text-pink-500" />
            <span className="sr-only">Industries</span>
          </div>
          <ul className="flex flex-wrap gap-2">
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

