import React from "react"
import Link from "next/link"
import { PlusIcon, Twitter } from "lucide-react"

import { Badge } from "@/components/ui/badge"

import { Button } from "./ui/button"
import { NextIcon, SupabaseIcon } from "./ui/icons"

export function Hero({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center md:items-start md:px-2 justify-center gap-2 md:ml-12">
      <div className="flex items-center space-x-2">
        <h1 className="text-5xl font-black text-left">Productised</h1>
        <Badge
          variant="outline"
          className="border border-primary/10 hidden md:block"
        >
          <span className="h-2 w-2 bg-yellow-400 rounded-full animate-pulse mr-1"></span>
          Showcase
        </Badge>
      </div>
      <div className="flex flex-col items-center md:items-start md:mt-4">
        <Badge className="hidden md:block" variant="default">
          Browse community templates 
        </Badge>

      </div>
      {children}
    </div>
  )
}
