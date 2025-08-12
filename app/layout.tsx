import localFont from "next/font/local"
import { ReactNode } from "react"
import "./globals.css"

import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

import { ThemeProvider } from "./providers"

export const fontSans = localFont({
  src: "../fonts/haskoy.ttf",
  variable: "--font-sans",
})

const defaultUrl = process.env.VERCEL_URL
  ? `https://www.nextjs.design`
  : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Productised.ai | Showcase",
  description:
    "Explore a curated productised.ai templates from our community",
  keywords:
    "Productised, AI, AI Productisation, Templates, Productised.ai",
  structuredData: {
    "@context": "http://schema.org",
    "@type": "WebSite",
    name: "Productised.ai Showcase",
    url: "https://www.productised.ai/",
    description:
      "A directory of awesome productised.ai templates.",
  },
  socialMediaTags: {
    "og:title": "Productised Showcase",
    "og:description":
      "Explore a curated directory of productised.ai templates!",
    "twitter:card": "summary_large_image",
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fontSans.variable} font-sans  `}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <main className="bg-[#FAFAFA] dark:bg-background  text-foreground flex flex-col justify-center items-center w-full pt-13">
              <div className=" w-full ">{children}</div>
            </main>
          </TooltipProvider>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
