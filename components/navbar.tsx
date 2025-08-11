'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import {
  Menu,
  X,
  Sparkles,
  Gem,
  ShoppingBag,
  BookOpen,
  Notebook,
  Croissant,
  Bot,
  Workflow,
  HardDriveDownload,
  Key,
  Link2,
  Layers,
  Layers2,
  Columns3Cog,
  ChartSpline,
  Inbox,
  Bolt,
  BookImage,
} from 'lucide-react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

interface FeatureLink {
  href: string
  name: string
  description?: string
  icon: React.ReactElement
}

interface MobileLink {
  groupName?: string
  links?: FeatureLink[]
  name?: string
  href?: string
}

const features: FeatureLink[] = [
  {
    href: '/roadmap',
    name: 'AI Products',
    description: 'With dynamic, branded outputs',
    icon: <Sparkles className="stroke-foreground fill-green-500/15" />,
  },
  {
    href: '/roadmap',
    name: 'Workflow Builder',
    description: 'Configure AI logic, no-code',
    icon: <Workflow className="stroke-foreground fill-indigo-500/15" />,
  },
  {
    href: '/roadmap',
    name: 'Hosting Included',
    description: 'No Github or database to connect',
    icon: <HardDriveDownload className="stroke-foreground fill-blue-500/15" />,
  },
]

const appLinks: FeatureLink[] = [
  {
    name: 'Prompt Builder (Free)',
    description: 'Prompt Refinement Tool & Library',
    href: '/prompt-builder',
    icon: <Bot className="stroke-foreground fill-blue-500/15" />,
  },
  {
    name: 'Book & Asset Builder (Free)',
    description: 'Generate content assets with AI',
    href: '/book-builder',
    icon: <BookImage className="stroke-foreground fill-blue-500/15" />,
  },
]

const moreFeatures: FeatureLink[] = [
  {
    href: '/roadmap',
    name: 'Prompt Chaining',
    description: 'Link AI steps for smarter outcomes',
    icon: <Link2 className="stroke-foreground fill-yellow-500/15" />,
  },
  {
    href: '/roadmap',
    name: 'Analytics',
    description: 'Track AI usage & leads',
    icon: <ChartSpline className="stroke-foreground fill-orange-500/15" />,
  },
  {
    href: '/roadmap',
    name: 'BYOK',
    description: 'Bring your own OpenAI API Key',
    icon: <Key className="stroke-foreground fill-teal-500/15" />,
  },
  {
    href: '/roadmap',
    name: 'Form Builder',
    description: 'Complete form builder',
    icon: <Layers2 className="stroke-foreground fill-blue-500/15" />,
  },
  {
    href: '/roadmap',
    name: 'Page Builder',
    description: 'Complete control over page design',
    icon: <Layers className="stroke-foreground fill-pink-500/15" />,
  },
  {
    href: '/roadmap',
    name: 'Custom Branding',
    description: 'Add your own branding and domains',
    icon: <Columns3Cog className="stroke-foreground fill-zinc-500/15" />,
  },
]

const useCases: FeatureLink[] = [
  {
    href: '/pricing',
    name: 'Lead Gen',
    description: 'Turn AI into inbound funnels',
    icon: <Inbox className="stroke-foreground fill-emerald-500/25" />,
  },
  {
    href: '/pricing',
    name: 'Client Delivery',
    description: 'Deliver solutions, not pdfs',
    icon: <ShoppingBag className="stroke-foreground fill-blue-500/15" />,
  },
  {
    href: '/pricing',
    name: 'Internal Tools',
    description: 'Speed up how your team works',
    icon: <Bolt className="stroke-foreground fill-pink-500/15" />,
  },
  {
    href: '/pricing',
    name: 'Outbound AI (enterprise)',
    description: 'Send smarter cold outreach',
    icon: <Gem className="stroke-foreground fill-zinc-500/15" />,
  },
]

const contentLinks: FeatureLink[] = [
  { name: 'Learn', href: 'https://www.skool.com/productised-8535/about', icon: <BookOpen className="stroke-foreground fill-purple-500/15" /> },
  { name: 'Showcase', href: 'https://showcase.productised.ai/', icon: <Croissant className="stroke-foreground fill-red-500/15" /> },
  { name: 'Blog', href: '/blog', icon: <Notebook className="stroke-foreground fill-zinc-500/15" /> },
]

const mobileLinks: MobileLink[] = [
  { groupName: 'Product', links: features },
  { groupName: 'Solutions', links: [...useCases, ...contentLinks] },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Learn', href: 'https://www.skool.com/productised-8535/about' },
  { name: 'Showcase', href: 'https://showcase.productised.ai/' },
]

export default function HeaderOne() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const { isAtLeast } = useMediaQuery()
  const isLarge = isAtLeast('lg')

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        data-state={isMobileMenuOpen ? 'active' : 'inactive'}
        {...(isScrolled && { 'data-scrolled': true })}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            'border-foregroud/5 absolute inset-x-0 top-0 z-50 transition-all duration-300',
            'in-data-scrolled:border-b in-data-scrolled:bg-background/75 in-data-scrolled:backdrop-blur',
            !isLarge && 'h-14 overflow-hidden border-b',
            isMobileMenuOpen && 'bg-background/75 h-screen backdrop-blur',
          )}
        >
          <div className="mx-auto max-w-6xl px-6 lg:px-12">
            <div className="relative flex flex-wrap items-center justify-between lg:py-5">
              <div className="flex justify-between gap-8 max-lg:h-14 max-lg:w-full max-lg:border-b">
                <Link href="/" aria-label="home" className="flex items-center space-x-2">
                  <img src="/images/logo.svg" alt="Logo" className="h-8" />
                </Link>

                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                  className="relative z-20 -m-2.5 -mr-3 block cursor-pointer p-2.5 lg:hidden"
                >
                  <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-5 duration-200" />
                  <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-5 -rotate-180 scale-0 opacity-0 duration-200" />
                </button>
              </div>

              {isLarge && <div className="absolute inset-0 m-auto size-fit"><NavMenu /></div>}
              {!isLarge && isMobileMenuOpen && <MobileMenu closeMenu={() => setIsMobileMenuOpen(false)} />}

              <div className="max-lg:in-data-[state=active]:mt-6 in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0">
                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                  <Button asChild variant="outline" size="sm"><Link href="#"><span>Login</span></Link></Button>
                  <Button asChild size="sm"><Link href="#"><span>Get Started</span></Link></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

const MobileMenu = ({ closeMenu }: { closeMenu: () => void }) => {
  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="**:hover:no-underline -mx-4 mt-0.5 space-y-0.5">
        {mobileLinks.map((link, index) => {
          if (link.groupName && link.links) {
            return (
              <AccordionItem key={index} value={link.groupName} className="group relative border-b-0">
                <AccordionTrigger className="**:!font-normal data-[state=open]:bg-muted flex items-center justify-between px-4 py-3 text-lg">
                  {link.groupName}
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <ul>
                    {link.links.map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        <Link href={feature.href} onClick={closeMenu} className="grid grid-cols-[auto_1fr] items-center gap-2.5 px-4 py-2">
                          <div aria-hidden className="flex items-center justify-center *:size-4">{feature.icon}</div>
                          <div className="text-base">{feature.name}</div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )
          }
          return null
        })}
      </Accordion>
      {mobileLinks.map((link, index) => {
        if (link.name && link.href) {
          return (
            <Link key={index} href={link.href} onClick={closeMenu} className="group relative block py-4 text-lg">
              {link.name}
            </Link>
          )
        }
        return null
      })}
    </div>
  )
}

const NavMenu = () => {
  return (
    <NavigationMenu className="**:data-[slot=navigation-menu-viewport]:transition-all **:data-[slot=navigation-menu-viewport]:bg-[color-mix(in_oklch,var(--color-muted)_25%,var(--color-background))] **:data-[slot=navigation-menu-viewport]:shadow-lg **:data-[slot=navigation-menu-viewport]:rounded-2xl **:data-[slot=navigation-menu-viewport]:top-4 [--color-muted:color-mix(in_oklch,var(--color-foreground)_5%,transparent)] [--viewport-outer-px:2rem]">
      <NavigationMenuList className="gap-3">
        <NavigationMenuItem value="product">
          <NavigationMenuTrigger>Product</NavigationMenuTrigger>
          <NavigationMenuContent className="origin-top pb-1.5 pl-1 pr-4 pt-1">
            <div className="min-w-6xl pr-18.5 grid w-full grid-cols-4 gap-1">
              <div className="bg-card row-span-2 grid grid-rows-subgrid gap-1 rounded-xl border p-1 pt-3">
                <span className="text-muted-foreground ml-2 text-xs">Features</span>
                <ul>
                  {features.map((feature, index) => (
                    <ListItem key={index} href={feature.href} title={feature.name} description={feature.description}>
                      {feature.icon}
                    </ListItem>
                  ))}
                </ul>
              </div>

              <div className="bg-card col-span-2 row-span-2 grid grid-rows-subgrid gap-1 rounded-xl border p-1 pt-3">
                <span className="text-muted-foreground ml-2 text-xs">More Features</span>
                <ul className="grid grid-cols-2">
                  {moreFeatures.map((feature, index) => (
                    <ListItem key={index} href={feature.href} title={feature.name} description={feature.description}>
                      {feature.icon}
                    </ListItem>
                  ))}
                </ul>
              </div>

              <div className="row-span-2 grid grid-rows-subgrid">
                <div className="bg-linear-to-b inset-ring-foreground/10 inset-ring-1 relative row-span-2 grid overflow-hidden rounded-xl bg-yellow-100 from-white via-white/50 to-sky-100 p-1 transition-colors duration-200 hover:bg-yellow-50">
                  {/* Card frame */}
                  <div className="aspect-3/2 absolute inset-0 px-6 pt-2">
                    <div className="mask-b-from-35% before:bg-background before:ring-foreground/10 after:ring-foreground/5 after:bg-background/75 before:z-1 group relative -mx-4 h-4/5 px-4 pt-6 before:absolute before:inset-x-6 before:bottom-0 before:top-4 before:rounded-t-xl before:border before:border-transparent before:ring-1 after:absolute after:inset-x-9 after:bottom-0 after:top-2 after:rounded-t-xl after:border after:border-transparent after:ring-1">
                      {/* Inner card keeps stacked look */}
                      <div className="bg-card ring-foreground/10 relative z-10 h-full overflow-hidden rounded-t-xl border border-transparent shadow-xl shadow-black/25 ring-1" />
                      {/* Overlay image */}
                      <div className="pointer-events-none absolute inset-0 px-4 pt-6 z-20">
                        <div className="h-full overflow-hidden rounded-t-xl">
                          <Image
                            src="/images/Community.png"
                            alt="Prompt Creator"
                            fill
                            sizes="(min-width: 1024px) 480px, 60vw"
                            className="object-cover"
                            priority
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="space-y-0.5 self-end p-3">
                    <NavigationMenuLink asChild className="text-foreground p-0 text-sm font-medium before:absolute before:inset-0 hover:bg-transparent focus:bg-transparent">
                      <Link href="https://www.skool.com/productised-8535/about">Join Our Community</Link>
                    </NavigationMenuLink>
                    <p className="text-foreground/60 line-clamp-1 text-xs">Join a growing community of modern experts...</p>
                  </div>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem value="solutions">
          <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
          <NavigationMenuContent className="origin-top pb-1.5 pl-1 pr-4 pt-1">
            <div className="min-w-6xl pr-18.5 grid w-full grid-cols-4 gap-1">
              <div className="bg-card col-span-2 row-span-2 grid grid-rows-subgrid gap-1 rounded-xl border p-1 pt-3">
                <span className="text-muted-foreground ml-2 text-xs">Use Cases</span>
                <ul className="grid grid-cols-2">
                  {useCases.map((useCase, index) => (
                    <ListItem key={index} href={useCase.href} title={useCase.name} description={useCase.description}>
                      {useCase.icon}
                    </ListItem>
                  ))}
                </ul>
              </div>
              <div className="bg-card row-span-2 grid grid-rows-subgrid gap-1 rounded-xl border p-1 pt-3">
                <span className="text-muted-foreground ml-2 text-xs">Flagship Products</span>
                <ul>
                  {appLinks.map((feature, index) => (
                    <ListItem key={index} href={feature.href} title={feature.name} description={feature.description}>
                      {feature.icon}
                    </ListItem>
                  ))}
                </ul>
              </div>
              <div className="row-span-2 grid grid-rows-subgrid gap-1 p-1 pt-3">
                <span className="text-muted-foreground ml-2 text-xs">Content</span>
                <ul>
                  {contentLinks.map((content, index) => (
                    <NavigationMenuLink key={index} asChild>
                      <Link href={content.href} className="grid grid-cols-[auto_1fr] items-center gap-2.5">
                        {content.icon}
                        <div className="text-foreground text-sm font-medium">{content.name}</div>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem value="pricing">
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/pricing">Pricing</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem value="Learn">
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="https://www.skool.com/productised-8535/about">Learn</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem value="showcase">
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="https://showcase.productised.ai/">Showcase</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

/* ---- Helper for the menu lists ---- */
function ListItem(
  { title, description, children, href, ...props }:
  React.ComponentPropsWithoutRef<'li'> & {
    href: string
    title: string
    description?: string
  }
) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild className="rounded-lg">
        <Link href={href} className="grid grid-cols-[auto_1fr] gap-3.5">
          <div className="bg-card ring-foreground/10 relative flex size-10 items-center justify-center rounded border border-transparent shadow shadow-sm ring-1">
            {children}
          </div>
          <div className="space-y-0.5">
            <div className="text-foreground text-sm font-medium">{title}</div>
            <p className="text-muted-foreground line-clamp-1 text-xs">{description}</p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
