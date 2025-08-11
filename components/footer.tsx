"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { PollIllustration } from "@/components/poll-illustration"
import DiagonalPattern from '@/components/diagonal-pattern'

const links = [
  {
    group: 'Product',
    items: [
      { title: 'Features', href: 'https://www.productised.ai/roadmap' },
      { title: 'Pricing', href: 'https://www.productised.ai/pricing' },
      { title: 'Feature Request', href: 'https://roadmap.productised.ai/t/feedback' },
      { title: 'Knowledgebase', href: 'https://knowledgebase.productised.ai/' },
      { title: 'Roadmap', href: 'https://roadmap.productised.ai/' },
      { title: 'Enterprise Plan', href: 'https://www.productised.ai/enterprise' },
    ],
  },
  {
    group: 'Resources',
    items: [
      { title: 'Learn', href: 'https://www.skool.com/productised-8535/about' },
      { title: 'Prompt Builder & Library', href: 'https://www.productised.ai/prompt-builder' },
      { title: 'Book & Asset Builder', href: 'https://www.productised.ai/book-builder' },
      { title: 'Blog', href: 'https://www.productised.ai/blog' },
      { title: 'LinkedIn', href: 'https://www.linkedin.com/company/productised-ai/' },
      { title: 'Youtube', href: 'https://www.youtube.com/@ProductisedAI' },
    ],
  },
  {
    group: 'Company',
    items: [
      { title: 'Home', href: 'https://www.productised.ai/' },
      { title: 'About', href: 'https://www.productised.ai/about' },
      { title: 'Partner Login', href: 'https://productised.partneroapp.com/login' },
      { title: 'Privacy Portal', href: 'https://products.privasee.io/privacy-center/632d95ef5e7d2500133b97d6' },
      { title: 'Terms', href: 'https://www.productised.ai/terms-of-service' },
      { title: 'Contact', href: 'https://www.productised.ai/contact' },
    ],
  },
]

export default function FooterSection() {
  return (
    <div className="bg-gradient-to-b from-[#fcfcfc] to-muted/70">
      {/* Call to Action Section with 4-side diagonal accents */}
      <section className="py-12 md:py-24">
        <div className="relative max-w-5xl mx-auto px-6">
          {/* Diagonal accents around CTA */}
          <DiagonalPattern className="absolute -top-6 left-0 right-0 h-6" />
          <DiagonalPattern className="absolute -bottom-6 left-0 right-0 h-6" />
          <DiagonalPattern className="absolute top-0 bottom-0 -left-6 w-6" />
          <DiagonalPattern className="absolute top-0 bottom-0 -right-6 w-6" />

          <Card className="relative overflow-hidden pl-8 pt-8 shadow-lg md:p-20">
            <div className="max-w-xl max-md:pr-8">
              <div className="relative">
                <h2 className="text-balance text-3xl font-semibold md:text-4xl">
                  Create <strong>AI Products</strong>, not Prototypes.
                </h2>
                <p className="text-muted-foreground mb-6 mt-4 text-balance">
                  Join a growing community of modern experts turning their knowledge & assets into scalable AI-powered products—without writing a single line of code.
                </p>
                <Button
                  asChild
                  className="text-black font-medium"
                  style={{
                    background: `linear-gradient(135deg, #F8D27F, #FFD966)`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <Link href="/pricing">Become Productised</Link>
                </Button>
              </div>
            </div>
            <div
              className="max-lg:mask-b-from-35% max-lg:pt-6 max-md:mt-4 lg:absolute lg:top-12 lg:w-1/3"
              style={{ left: '75%' }}
            >
              <PollIllustration />
            </div>
          </Card>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative py-12 sm:py-20">
        {/* Decorative diagonal stripe above footer */}
        <DiagonalPattern className="absolute -top-6 left-0 right-0 h-6" />

        <div className="mx-auto max-w-5xl space-y-16 px-6">
          <div className="grid gap-12 md:grid-cols-5">
            <div className="space-y-6 md:col-span-2 md:space-y-12">
              <Link href="/" aria-label="go home" className="block w-fit">
                <img src="/logo.svg" alt="Productised Logo" className="h-8 w-auto" />
              </Link>
              <p className="text-muted-foreground text-balance text-sm">
                Not another vibe-coded side project. Productised is built for professionals creating AI products with purpose.
              </p>
            </div>

            <div className="col-span-3 grid gap-6 sm:grid-cols-3">
              {links.map((link) => (
                <div key={link.group} className="space-y-4 text-sm">
                  <span className="block font-medium">{link.group}</span>
                  <div className="flex flex-wrap gap-4 sm:flex-col">
                    {link.items.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="text-muted-foreground hover:text-primary block duration-150"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-4">
            <span className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Productised, All rights reserved
            </span>
            <div className="ring-foreground/5 bg-card flex items-center gap-2 rounded-full border border-transparent py-1 pl-2 pr-4 shadow ring-1">
              <div className="relative flex w-3 h-3">
                <span className="absolute inset-0 block w-full h-full animate-pulse rounded-full bg-emerald-100" />
                <span className="relative m-auto block w-1 h-1 rounded-full bg-emerald-500" />
              </div>
              <span className="text-sm">We are live</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
