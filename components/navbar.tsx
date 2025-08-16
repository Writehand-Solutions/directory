'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport, // ✅ add this
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
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
  Columns3,
  BarChart3,
  Inbox,
  Bolt,
  BookImage,
  ChevronRight,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

/* -------------------- types -------------------- */
interface FeatureLink {
  href: string;
  name: string;
  description?: string;
  icon: React.ReactElement;
}
interface MobileLink {
  groupName?: string;
  links?: FeatureLink[];
  name?: string;
  href?: string;
}

/* -------------------- link data -------------------- */
const features: FeatureLink[] = [
  { href: 'https://www.productised.ai/roadmap', name: 'AI Products', description: 'With dynamic, branded outputs', icon: <Sparkles className="stroke-foreground fill-green-500/15" /> },
  { href: 'https://www.productised.ai/roadmap', name: 'Workflow Builder', description: 'Configure AI logic, no-code', icon: <Workflow className="stroke-foreground fill-indigo-500/15" /> },
  { href: 'https://www.productised.ai/roadmap', name: 'Hosting Included', description: 'No Github or database to connect', icon: <HardDriveDownload className="stroke-foreground fill-blue-500/15" /> },
];

const appLinks: FeatureLink[] = [
  { name: 'Prompt Builder (Free)', description: 'Prompt Refinement Tool & Library', href: 'https://www.productised.ai/prompt-builder', icon: <Bot className="stroke-foreground fill-blue-500/15" /> },
  { name: 'Book & Asset Builder (Free)', description: 'Generate content assets with AI', href: 'https://www.productised.ai/book-builder', icon: <BookImage className="stroke-foreground fill-blue-500/15" /> },
];

const moreFeatures: FeatureLink[] = [
  { href: 'https://www.productised.ai/roadmap', name: 'Prompt Chaining', description: 'Link AI steps for smarter outcomes', icon: <Link2 className="stroke-foreground fill-yellow-500/15" /> },
  { href: 'https://www.productised.ai/roadmap', name: 'Analytics', description: 'Track AI usage & leads', icon: <BarChart3 className="stroke-foreground fill-orange-500/15" /> },
  { href: 'https://www.productised.ai/roadmap', name: 'BYOK', description: 'Bring your own OpenAI API Key', icon: <Key className="stroke-foreground fill-teal-500/15" /> },
  { href: 'https://www.productised.ai/roadmap', name: 'Form Builder', description: 'Complete form builder', icon: <Layers2 className="stroke-foreground fill-blue-500/15" /> },
  { href: 'https://www.productised.ai/roadmap', name: 'Page Builder', description: 'Complete control over page design', icon: <Layers className="stroke-foreground fill-pink-500/15" /> },
  { href: 'https://www.productised.ai/roadmap', name: 'Custom Branding', description: 'Add your own branding and domains', icon: <Columns3 className="stroke-foreground fill-zinc-500/15" /> },
];

const useCases: FeatureLink[] = [
  { href: 'https://www.productised.ai/pricing', name: 'Lead Gen', description: 'Turn AI into inbound funnels', icon: <Inbox className="stroke-foreground fill-emerald-500/25" /> },
  { href: 'https://www.productised.ai/pricing', name: 'Client Delivery', description: 'Deliver solutions, not pdfs', icon: <ShoppingBag className="stroke-foreground fill-blue-500/15" /> },
  { href: 'https://www.productised.ai/pricing', name: 'Internal Tools', description: 'Speed up how your team works', icon: <Bolt className="stroke-foreground fill-pink-500/15" /> },
  { href: 'https://www.productised.ai/pricing', name: 'Outbound AI (enterprise)', description: 'Send smarter cold outreach', icon: <Gem className="stroke-foreground fill-zinc-500/15" /> },
];

const contentLinks: FeatureLink[] = [
  { name: 'Learn', href: 'https://www.skool.com/productised-8535/about', icon: <BookOpen className="stroke-foreground fill-purple-500/15" /> },
  { name: 'Showcase', href: 'https://showcase.productised.ai/', icon: <Croissant className="stroke-foreground fill-red-500/15" /> },
  { name: 'Blog', href: 'https://www.productised.ai/blog', icon: <Notebook className="stroke-foreground fill-zinc-500/15" /> },
];

const mobileLinks: MobileLink[] = [
  { groupName: 'Product', links: features },
  { groupName: 'Solutions', links: [...useCases, ...contentLinks] },
  { name: 'Pricing', href: 'https://www.productised.ai/pricing' },
  { name: 'Learn', href: 'https://www.skool.com/productised-8535/about' },
  { name: 'Showcase', href: 'https://showcase.productised.ai/' },
];

/* -------------------- component -------------------- */
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      data-state={isMobileMenuOpen ? 'active' : 'inactive'}
      {...(isScrolled && { 'data-scrolled': true })}
      className="sticky top-0 z-50"
    >
      <div
        className={cn(
          'w-full border-b border-border/50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300',
          'data-[scrolled=true]:shadow-sm'
        )}
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="relative flex items-center justify-between py-3 lg:py-4">
            {/* Left: logo + mobile toggle */}
            <div className="flex w-full items-center justify-between gap-8 lg:w-auto">
              <Link href="https://www.productised.ai" aria-label="home" className="flex items-center gap-2">
                {/* NOTE: avoid spaces in filenames if possible */}
                <Image src="/full logo.svg" alt="Logo" width={140} height={32} className="h-8 w-auto" />
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                className="relative -m-2.5 p-2.5 lg:hidden"
              >
                <Menu className={cn('size-5 duration-200', isMobileMenuOpen && 'rotate-180 scale-0 opacity-0')} />
                <X className={cn('absolute inset-0 m-auto size-5 -rotate-180 scale-0 opacity-0 duration-200', isMobileMenuOpen && 'rotate-0 scale-100 opacity-100')} />
              </button>
            </div>

            {/* Center: desktop nav */}
            <div className="hidden items-center justify-center lg:flex">
              <NavMenu />
            </div>

            {/* Right: actions */}
            <div className="hidden items-center gap-3 lg:flex">
              <Button asChild variant="outline" size="sm">
                <Link href="https://app.productised.ai/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="https://www.productised.ai/contact">
                  Get Started
                  <ChevronRight className="ml-1 size-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu sheet */}
          {isMobileMenuOpen && (
            <div className="lg:hidden">
              <MobileMenu closeMenu={() => setIsMobileMenuOpen(false)} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/* -------------------- mobile menu -------------------- */
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
            );
          }
          return null;
        })}
      </Accordion>

      {mobileLinks.map((link, index) => {
        if (link.name && link.href) {
          return (
            <Link key={index} href={link.href} onClick={closeMenu} className="group relative block py-4 text-lg">
              {link.name}
            </Link>
          );
        }
        return null;
      })}
    </div>
  );
};

/* -------------------- desktop nav -------------------- */
function NavMenu() {
  return (
    <NavigationMenu
      className="
        relative z-[60]
        **:data-[slot=navigation-menu-viewport]:mx-auto
        **:data-[slot=navigation-menu-viewport]:w-[min(92vw,72rem)]
        **:data-[slot=navigation-menu-viewport]:left-1/2
        **:data-[slot=navigation-menu-viewport]:-translate-x-1/2
        **:data-[slot=navigation-menu-viewport]:transition-all
        **:data-[slot=navigation-menu-viewport]:bg-[color-mix(in_oklch,var(--color-muted)_25%,var(--color-background))]
        **:data-[slot=navigation-menu-viewport]:shadow-lg
        **:data-[slot=navigation-menu-viewport]:rounded-2xl
        **:data-[slot=navigation-menu-viewport]:top-4
        [--color-muted:color-mix(in_oklch,var(--color-foreground)_5%,transparent)]
      "
    >
      <NavigationMenuList className="gap-3">
        <NavigationMenuItem value="product">
          <NavigationMenuTrigger>Product</NavigationMenuTrigger>
          <NavigationMenuContent className="origin-top pb-1.5 pl-1 pr-4 pt-1">
            <div className="mx-auto w-[min(92vw,72rem)] grid grid-cols-4 gap-3 px-2 lg:px-4">
              {/* Features */}
              <div className="bg-card row-span-2 grid grid-rows-subgrid gap-2 rounded-2xl border p-3">
                <span className="text-muted-foreground ml-2 text-xs">Features</span>
                <ul>
                  {features.map((feature, index) => (
                    <ListItem key={index} href={feature.href} title={feature.name} description={feature.description}>
                      {feature.icon}
                    </ListItem>
                  ))}
                </ul>
              </div>

              {/* More Features */}
              <div className="bg-card col-span-2 row-span-2 grid grid-rows-subgrid gap-2 rounded-2xl border p-3">
                <span className="text-muted-foreground ml-2 text-xs">More Features</span>
                <ul className="grid grid-cols-2">
                  {moreFeatures.map((feature, index) => (
                    <ListItem key={index} href={feature.href} title={feature.name} description={feature.description}>
                      {feature.icon}
                    </ListItem>
                  ))}
                </ul>
              </div>

              {/* Community card */}
              <div className="row-span-2 grid grid-rows-subgrid">
                <div className="relative row-span-2 grid overflow-hidden rounded-2xl border p-1 bg-gradient-to-b from-white via-white/60 to-sky-100 shadow-sm">
                  {/* lowered padding top and nudged image wrapper up */}
                  <div className="absolute inset-0 px-6 pt-1">
                    <div className="relative -mx-6 -mt-3 h-4/5 px-4 pt-6">
                      <div className="relative z-10 h-full overflow-hidden rounded-t-xl border shadow">
                        <Image
                          src="/Comm2.png"
                          alt="Prompt Creator"
                          fill
                          sizes="(min-width: 1024px) 480px, 60vw"
                          className="object-cover"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-0.5 self-end p-3">
                    <NavigationMenuLink asChild className="text-foreground p-0 text-sm font-medium before:absolute before:inset-0 hover:bg-transparent focus:bg-transparent">
                      <Link href="https://www.skool.com/productised-8535/about">Join Our Community</Link>
                    </NavigationMenuLink>
                    <p className="text-foreground/60 line-clamp-1 text-xs">Join a growing community of modern experts…</p>
                  </div>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem value="solutions">
          <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
          <NavigationMenuContent className="origin-top pb-1.5 pl-1 pr-4 pt-1">
            <div className="mx-auto w-[min(92vw,72rem)] grid grid-cols-4 gap-3 px-2 lg:px-4">
              <div className="bg-card col-span-2 row-span-2 grid grid-rows-subgrid gap-2 rounded-2xl border p-3">
                <span className="text-muted-foreground ml-2 text-xs">Use Cases</span>
                <ul className="grid grid-cols-2">
                  {useCases.map((useCase, index) => (
                    <ListItem key={index} href={useCase.href} title={useCase.name} description={useCase.description}>
                      {useCase.icon}
                    </ListItem>
                  ))}
                </ul>
              </div>
              <div className="bg-card row-span-2 grid grid-rows-subgrid gap-2 rounded-2xl border p-3">
                <span className="text-muted-foreground ml-2 text-xs">Flagship Products</span>
                <ul>
                  {appLinks.map((feature, index) => (
                    <ListItem key={index} href={feature.href} title={feature.name} description={feature.description}>
                      {feature.icon}
                    </ListItem>
                  ))}
                </ul>
              </div>
              <div className="row-span-2 grid grid-rows-subgrid gap-2 p-1 pt-3">
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
            <Link href="https://www.productised.ai/pricing">Pricing</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem value="learn">
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

      {/* ✅ render the centered/clamped viewport */}
      <NavigationMenuViewport />
    </NavigationMenu>
  );
}

/* -------------------- shared list item -------------------- */
function ListItem(
  { title, description, children, href, ...props }:
  React.ComponentPropsWithoutRef<'li'> & { href: string; title: string; description?: string }
) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild className="rounded-lg">
        <Link href={href} className="grid grid-cols-[auto_1fr] gap-3.5 rounded-lg p-2 hover:bg-accent/40">
          <div className="bg-card ring-foreground/10 relative flex size-10 items-center justify-center rounded border border-transparent shadow shadow-sm ring-1">
            {children}
          </div>
          <div className="space-y-0.5">
            <div className="text-foreground text-sm font-medium">{title}</div>
            {description ? <p className="text-muted-foreground line-clamp-1 text-xs">{description}</p> : null}
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

