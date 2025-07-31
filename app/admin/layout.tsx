import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/db/supabase/server"

import { NavSidebar } from "@/components/nav"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const db = createClient()
  const {
    data: { user },
    error,
  } = await db.auth.getUser()

  if (error || !user) {
    console.error("Error fetching user:", error)
    return redirect("/login")
  }

  const claimsAdmin = user.app_metadata?.claims_admin
  if (!claimsAdmin) {
    return redirect("/")
  }
  return (
    <>
    <Navbar/>
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {children}
    </div>
    <Footer/>
    </>
  )
}
