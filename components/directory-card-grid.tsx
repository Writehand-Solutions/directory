"use client"

import React, { Suspense, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

import { FeaturedExternalLink, ProductLink } from "./directory-product-card"

interface Product {
  id: string
  created_at: string
  full_name: string
  email: string
  twitter_handle: string
  product_website: string
  codename: string
  punchline: string
  description: string
  logo_src: string
  user_id: string
  tags: string[]
  view_count: number
  approved: boolean
  labels: string[]
  categories: string
}

export interface SEOCardGridProps {
  sortedData: Product[]
  filteredFeaturedData?: Product[] | null
  children?: React.ReactNode
}

/** helper: make all anchors open in same tab */
function forceSameTab(root: HTMLElement | null) {
  if (!root) return
  const anchors = root.querySelectorAll<HTMLAnchorElement>("a")
  anchors.forEach((a) => {
    a.target = "_self"
    // optional: remove noreferrer/noopener if they were added for _blank
    if (a.rel) a.rel = a.rel.replace(/\bnoopener\b|\bnoreferrer\b/g, "").trim()
  })
}

export const ResourceCardGrid: React.FC<SEOCardGridProps> = ({
  sortedData,
  children,
}) => {
  const pathname = usePathname()
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Ensure all links inside this section open in same tab
  useEffect(() => {
    forceSameTab(wrapperRef.current)
  }, [sortedData, pathname])

  return (
    <div
      ref={wrapperRef}
      className="flex flex-col md:items-start gap-4 overflow-hidden pb-4 md:mx-4 mx-0 relative"
    >
      <div
        className={cn(
          "px-4",
          pathname.includes("/products")
            ? "md:p-4 md:gap-3"
            : "bg-white p-4 gap-3 dark:bg-[#1E1E1E] rounded-[2rem] shadow-[0_0_0_1px_rgba(0,0,0,0.1)_inset,0_0.5px_0.5px_rgba(0,0,0,0.05)_inset,0_-0.5px_0.5px_rgba(0,0,0,0.05)_inset,0_1px_2px_rgba(0,0,0,0.1)] dark:shadow-[0_0_0_0.5px_rgba(255,255,255,0.06)_inset,0_0.5px_0.5px_rgba(255,255,255,0.1)_inset,0_-0.5px_0.5px_rgba(255,255,255,0.1)_inset,0_0.5px_1px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.4)]"
        )}
      >
        {children}
      </div>

      <div
        className={cn(
          "p-4 w-full",
          pathname.includes("/products")
            ? ""
            : "bg-white dark:bg-[#1E1E1E] rounded-[2rem] shadow-[0_0_0_1px_rgba(0,0,0,0.1)_inset,0_0.5px_0.5px_rgba(0,0,0,0.05)_inset,0_-0.5px_0.5px_rgba(0,0,0,0.05)_inset,0_1px_2px_rgba(0,0,0,0.1)] dark:shadow-[0_0_0_0.5px_rgba(255,255,255,0.06)_inset,0_0.5px_0.5px_rgba(255,255,255,0.1)_inset,0_-0.5px_0.5px_rgba(255,255,255,0.1)_inset,0_0.5px_1px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.4)]"
        )}
      >
        <Suspense fallback={null}>
          <div key="tailwind-grid" className="relative">
            <TailwindMasonryGrid filteredData={sortedData} />
          </div>
        </Suspense>
      </div>
    </div>
  )
}

interface TailwindMasonryGridProps {
  filteredData: Product[]
}

const TailwindMasonryGrid: React.FC<TailwindMasonryGridProps> = ({
  filteredData,
}) => {
  return (
    <div className="flex justify-center w-full">
      {filteredData.length > 0 ? (
        <div className="gap-4 w-full">
          <div className="columns-1 lg:columns-2 xl:columns-3 2xl:columns-4 3xl:columns-4 space-y-3 w-full">
            {filteredData.map((data, index) => (
              <div key={`main-${index}-${data.id}`}>
                <ProductLink data={data} order={index} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export const FeaturedGrid: React.FC<{ featuredData: Product[] }> = ({
  featuredData,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    forceSameTab(ref.current)
  }, [featuredData])

  return (
    <div
      ref={ref}
      className="w-full mx-auto max-w-7xl bg-neutral-50/40 dark:bg-neutral-950/40 border border-dashed border-black/10 py-3 px-3 rounded-2xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {featuredData.map((data, index) => (
          <div key={`featured-${index}-${data.id}`} className="">
            <FeaturedExternalLink trim={true} data={data} order={index} />
          </div>
        ))}
      </div>
    </div>
  )
}

export const EmptyFeaturedGrid = () => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    forceSameTab(ref.current)
  }, [])

  const emptyData = [
    {
      codename: "Join Our Community",
      punchline: "Next.j, Supabase & Tailwind Starters",
      product_website: "https://www.skool.com/productised-8535/about",
      description: "Join our free community for modern experts...",
      logo_src: "/Comm2.png",
      tags: ["featured"],
      labels: ["Community"],
    },
    {
      codename: "Prompt Builder & Library",
      product_website: "https://productised.ai/prompt-builder",
      punchline: "Next.j, Supabase & Tailwind Starters",
      description: "Free access to our Prompt Builder & Library...",
      logo_src: "/Promptmaker.png",
      tags: ["featured"],
      labels: ["Prompt Builder"],
    },
    {
      codename: "AI Book and Asset Builder",
      product_website: "https://productised.ai/book-builder",
      punchline: "Next.j, Supabase & Tailwind Starters",
      description: "Free access to our Book & Asset Builder...",
      logo_src: "/bookmaker.png",
      tags: ["featured"],
      labels: ["Book Builder"],
    },
  ]

  return (
    <div
      ref={ref}
      className="w-full mx-auto max-w-7xl bg-black/20 dark:bg-neutral-950/40 border border-dashed border-black/10 py-3 px-3 rounded-[1.9rem]"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {emptyData.map((data, index) => (
          <div key={`featured-${index}-${data.codename}`} className="md:py-0">
            {/* @ts-expect-error */}
            <FeaturedExternalLink trim={true} data={data} order={index} />
          </div>
        ))}
      </div>
    </div>
  )
}
