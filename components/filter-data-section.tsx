'use client'
import { cn, truncateString } from "@/lib/utils"
import { BoxIcon, Tag, Hash } from "lucide-react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

const filtersData = {
  categories: ["design", "dev", "learning", "media"],
  tags: [
    "ui kits", "tools", "gradients", "libraries", "design systems",
    "icons", "components", "tailwindcss", "frameworks"
  ],
  labels: [
    "frontend", "tools", "graphic", "ui", "fonts",
    "typography", "icons", "kits", "devops", "tutorials"
  ]
}

export function FilterDataSection() {
  const searchParams = useSearchParams()
  const { labels, categories, tags } = filtersData
  return (
    <div className="flex flex-col md:flex-row gap-6 mt-6">
      {/* Categories */}
      <div className="flex flex-col items-start gap-2">
        <BoxIcon className="h-4 w-4 text-yellow-500" />
        <ul className="w-32 flex flex-col gap-2 items-start justify-center py-2">
          {categories?.map((category , catIdx) => (
            <li key={catIdx}>
              <Link
                href={`/products?category=${category}`}
                className={cn(
                  "flex items-start text-sm font-medium rounded-md px-2 py-0.5",
                  "text-neutral-800 dark:text-neutral-200",
                  "bg-white dark:bg-neutral-900 border border-border",
                  "hover:bg-yellow-100 dark:hover:bg-neutral-800",
                  searchParams.get("category") === category &&
                    "bg-yellow-400 text-black dark:text-neutral-900"
                )}
              >
                {truncateString(category, 12)}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className="flex flex-col items-start gap-2">
        <Tag className="h-4 w-4 text-pink-500" />
        <ul className="w-32 flex flex-col gap-2 items-start justify-center py-2">
          {tags?.map((tag , tagIdx) => (
            <li key={tagIdx}>
              <Link
                href={`/products?tag=${tag}`}
                className={cn(
                  "flex items-start text-sm font-medium rounded-md px-2 py-0.5",
                  "text-neutral-800 dark:text-neutral-200",
                  "bg-white dark:bg-neutral-900 border border-border",
                  "hover:bg-pink-100 dark:hover:bg-neutral-800",
                  searchParams.get("tag") === tag &&
                    "bg-pink-400 text-black dark:text-neutral-900"
                )}
              >
                {truncateString(tag, 12)}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Labels */}
      <div className="flex flex-col items-start gap-2">
        <Hash className="h-4 w-4 text-blue-500" />
        <ul className="w-32 flex flex-col gap-2 items-start justify-center py-2">
          {labels?.map((label  , labIdx) => (
            <li key={labIdx}>
              <Link
                href={`/products?label=${label}`}
                className={cn(
                  "flex items-start text-sm font-medium rounded-md px-2 py-0.5",
                  "text-neutral-800 dark:text-neutral-200",
                  "bg-white dark:bg-neutral-900 border border-border",
                  "hover:bg-blue-100 dark:hover:bg-neutral-800",
                  searchParams.get("label") === label &&
                    "bg-cyan-400 text-black dark:text-neutral-900"
                )}
              >
                {truncateString(label, 12)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
