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
    <div className="relative z-10 w-full">
      <div className="mt-6 mb-4 flex flex-col gap-6 md:flex-row md:items-start">
        {/* Categories */}
        <div className="flex flex-col items-start gap-2 md:min-w-[12rem]">
          <BoxIcon className="h-4 w-4 text-yellow-500" />
          {/* On small screens show in 2 cols to save height; on md keep a single column */}
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-1">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={`/products?category=${encodeURIComponent(category)}`}
                  className={cn(
                    "block rounded-md px-2 py-1 text-sm font-medium",
                    searchParams.get("category") === category
                      ? "bg-yellow-400 text-black"
                      : "bg-white"
                  )}
                >
                  {truncateString(category, 18)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Industries (responsive grid instead of fixed 3-column flex) */}
        <div className="flex flex-1 flex-col items-start gap-2">
          <Tag className="h-4 w-4 text-pink-500" />
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
            {industries.map((industry) => (
              <li key={industry}>
                <Link
                  href={`/products?industry=${encodeURIComponent(industry)}`}
                  className={cn(
                    "block rounded-md px-2 py-1 text-sm font-medium",
                    searchParams.get("industry") === industry
                      ? "bg-pink-400 text-black"
                      : "bg-white"
                  )}
                >
                  {truncateString(industry, 18)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
