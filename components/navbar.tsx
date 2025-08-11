'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';
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
import { cn } from '@/lib/utils';

/* ---------- Types ---------- */
interface FeatureLink {
  href: string;
  name: string;
  description?: string;
  icon: React.ReactElement;
}

/* ---------- Link data ---------- */
const features: FeatureLink[] = [
  { href: '/roadmap', name: 'AI Products', description: 'With dynamic, branded outputs', icon: <Sparkles className="stroke-foreground fill-green-500/15" /> },
  { href: '/roadmap', name: 'Workflow Builder', description: 'Configure AI logic, no-code', icon: <Workflow className="stroke-foreground fill-indigo-500/15" /> },
  { href: '/roadmap', name: 'Hosting Included', description: 'No Github or database to connect', icon: <HardDriveDownload className="stroke-foreground fill-blue-500/15" /> },
];

const moreFeatures: FeatureLink[] = [
  { href: '/roadmap', name: 'Prompt Chaining', description: 'Link AI steps for smarter outcomes', icon: <Link2 className="stroke-foreground fill-yellow-500/15" /> },
  { href: '/roadmap', name: 'Analytics', description: 'Track AI usage & leads', icon: <BarChart3 className="stroke-foreground fill-orange-500/15" /> },
  { href: '/roadmap', name: 'BYOK', description: 'Bring your own OpenAI API Key', icon: <Key className="stroke-foreground fill-teal-500/15" /> },
  { href: '/roadmap', name: 'Form Builder', description: 'Complete form builder', icon: <Layers2 className="stroke-foreground fill-blue-500/15" /> },
  { href: '/roadmap', name: 'Page Builder', description: 'Complete control over page design', icon: <Layers className="stroke-foreground fill-pink-500/15" /> },
  { href: '/roadmap', name: 'Custom Branding', description: 'Add your own branding and domains', icon: <Columns3 className="stroke-foreground fill-zinc-500/15" /> },
];

const useCases: FeatureLink[] = [
  { href: '/pricing', name: 'Lead Gen', description: 'Turn AI into inbound funnels', icon: <Inbox className="stroke-foreground fill-emerald-500/25" /> },
  { href: '/pricing', name: 'Client Delivery', description: 'Deliver solutions, not pdfs', icon: <ShoppingBag className="stroke-foreground fill-blue-500/15" /> },
  { href: '/pricing', name: 'Internal Tools', description: 'Speed up how your team works', icon: <Bolt className="stroke-foreground fill-pink-500/15" /> },
  { href: '/pricing', name: 'Outbound AI (enterprise)', description: 'Send smarter cold outreach', icon: <Gem className="stroke-foreground fill-zinc-500/15" /> },
];

const appLinks: FeatureLink[] = [
  { name: 'Prompt Builder (Free)', description: 'Prompt Refinement Tool & Library', href: '/prompt-builder', icon: <Bot className="stroke-foreground fill-blue-500/15" /> },
  { name: 'Book & Asset Builder (Free)', description: 'Generate content assets with AI', href: '/book-builder', icon: <BookImage className="stroke-foreground fill-blue-500/15" /> },
];

const contentLinks: FeatureLink[] = [
  { name: 'Learn', href: 'https://www.skool.com/productised-8535/about', icon: <BookOpen className="stroke-foreground fill-purple-500/15" /> },
  { name: 'Showcase', href: 'https://showcase.productised.ai/', icon: <Croissant className="stroke-foreground fill-red-500/15" /> },
  { name: 'Blog', href: '/blog', icon: <Notebook className="stroke-foreground fill-zinc-500/15" /> },
];

/* ---------- Component ---------- */
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openGroup, setOpenGroup] = React.useState<string | null>(null);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header data-state={mobileOpen ? 'active' : 'inactive'} {...(scrolled && { 'data-scrolled': true })} className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'absolute inset-x-0 top-0 z-50 transition-all duration-300',
          'in-data-scrolled:border-b in-data-scrolled:bg-background/75 in-data-scrolled:backdrop-blur',
          'border-border/50'
        )}
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="relative flex items-center justify-between py-3 lg:py-5">
            {/* Left: logo + mobile toggle */}
            <div className="flex w-full items-center justify-between gap-6 lg:w-auto">
              <Link href="/" aria-label="home" className="flex items-center gap-2">
                {/* adjust path if your logo differs */}
                <Image src="/logo.svg" alt="Logo" width={112} height={32} className="h-8 w-auto" />
              </Link>

              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
                className="relative -m-2.5 p-2.5 lg:hidden"
              >
                <Menu className={cn('size-5 duration-200', mobileOpen && 'rotate-180 scale-0 opacity-0')} />
                <X className={cn('absolute inset-0 m-auto size-5 -rotate-180 scale-0 opacity-0 duration-200', mobileOpen && 'rotate-0 scale-100 opacity-100')} />
              </button>
            </div>

            {/* Center: desktop nav */}
            <div className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex">
              <div className="pointer-events-auto">
                <NavMenu />
              </div>
            </div>

            {/* Right: actions */}
            <div className="hidden items-center gap-3 lg:flex">
              <Button asChild variant="outline" size="sm">
                <Link href="https://app.productised.ai/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/contact">
                  Get Started
                  <ChevronRight className="ml-1 size-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile sheet */}
          {mobileOpen && (
            <div className="lg:hidden">
              <nav className="divide-y">
                <MobileGroup
                  label="Product"
                  open={openGroup === 'product'}
                  onToggle={() => setOpenGroup(openGroup === 'product' ? null : 'product')}
                >
                  <MobileList items={features} />
                  <MobileList items={moreFeatures} />
                </MobileGroup>

                <MobileGroup
                  label="Solutions"
                  open={openGroup === 'solutions'}
                  onToggle={() => setOpenGroup(openGroup === 'solutions' ? null : 'solutions')}
                >
                  <MobileList items={useCases} />
                  <MobileList items={appLinks} />
                  <MobileList items={contentLinks} />
                </MobileGroup>

                <div className="grid gap-2 py-3">
                  <Link href="/pricing" onClick={() => setMobileOpen(false)} className="text-base">
                    Pricing
                  </Link>
                  <Link href="https://www.skool.com/productised-8535/about" onClick={() => setMobileOpen(false)} className="text-base">
                    Learn
                  </Link>
                  <Link href="https://showcase.productised.ai/" onClick={() => setMobileOpen(false)} className="text-base">
                    Showcase
                  </Link>
                </div>

                <div className="flex gap-2 py-4">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="https://app.productised.ai/login" onClick={() => setMobileOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/contact" onClick={() => setMobileOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

/* ---------- Desktop nav menu ---------- */
function NavMenu() {
  return (
    <NavigationMenu className="**:data-[slot=navigation-menu-viewport]:transition-all **:data-[slot=navigation-menu-viewport]:bg-[color-mix(in_oklch,var(--color-muted)_25%,var(--color-background))] **:data-[slot=navigation-menu-viewport]:shadow-lg **:data-[slot=navigation-menu-viewport]:rounded-2xl **:data-[slot=navigation-menu-viewport]:top-4 [--color-muted:color-mix(in_oklch,var(--color-foreground)_5%,transparent)] [--viewport-outer-px:2rem]">
      <NavigationMenuList className="gap-3">
        <NavigationMenuItem value="product">
          <NavigationMenuTrigger>Product</NavigationMenuTrigger>
          <NavigationMenuContent className="origin-top pb-1.5 pl-1 pr-4 pt-1">
            <div className="min-w-6xl grid w-full grid-cols-4 gap-1 pr-18.5">
              {/* Features */}
              <div className="bg-card row-span-2 grid grid-rows-subgrid gap-1 rounded-xl border p-1 pt-3">
                <span className="text-muted-foreground ml-2 text-xs">Features</span>
                <ul>
                  {features.map((f, i) => (
                    <ListItem key={i} href={f.href} title={f.name} description={f.description}>
                      {f.icon}
                    </ListItem>
                  ))}
                </ul>
              </div>

              {/* More features */}
              <div className="bg-card col-span-2 row-span-2 grid grid-rows-subgrid gap-1 rounded-xl border p-1 pt-3">
                <span className="text-muted-foreground ml-2 text-xs">More Features</span>
                <ul className="grid grid-cols-2">
                  {moreFeatures.map((f, i) => (
                    <ListItem key={i} href={f.href} title={f.name} description={f.description}>
                      {f.icon}
                    </ListItem>
                  ))}
                </ul>
              </div>

              {/* Community card */}
              <div className="row-span-2 grid grid-rows-subgrid">
                <div className="bg-linear-to-b inset-ring-foreground/10 inset-ring-1 relative row-span-2 grid overflow-hidden rounded-xl bg-yellow-100 from-white via-white/50 to-sky-100 p-1 transition-colors duration-200 hover:bg-yellow-50">
                  <div className="aspect-3/2 absolute inset-0 px-6 pt-2">
                    <div className="mask-b-from-35% before:bg-background before:ring-foreground/10 after:ring-foreground/5 before:z-1 group relative -mx-4 h-4/5 px-4 pt-6 before:absolute before:inset-x-6 before:bottom-0 before:top-4 before:rounded-t-xl before:border before:border-transparent before:ring-1 after:absolute after:inset-x-9 after:bottom-0 after:top-2 after:rounded-t-xl after:border after:border-transparent after:ring-1">
                      <div className="bg-card ring-foreground/10 relative z-10 h-full overflow-hidden rounded-t-xl border border-transparent shadow-xl shadow-black/25 ring-1" />
                      <div className="pointer-events-none absolute inset-0 z-20 px-4 pt-6">
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
            <div className="min-w-6xl grid w-full grid-cols-4 gap-1 pr-18.5">
              <div className="bg-card col-span-2 row-span-2 grid grid-rows-subgrid gap-1 rounded-xl border p-1 pt-3">
                <span className="text-muted-foreground ml-2 text-xs">Use Cases</span>
                <ul className="grid grid-cols-2">
                  {useCases.map((u, i) => (
                    <ListItem key={i} href={u.href} title={u.name} description={u.description}>
                      {u.icon}
                    </ListItem>
                  ))}
                </ul>
              </div>
              <div className="bg-card row-span-2 grid grid-rows-subgrid gap-1 rounded-xl border p-1 pt-3">
                <span className="text-muted-foreground ml-2 text-xs">Flagship Products</span>
                <ul>
                  {appLinks.map((f, i) => (
                    <ListItem key={i} href={f.href} title={f.name} description={f.description}>
                      {f.icon}
                    </ListItem>
                  ))}
                </ul>
              </div>
              <div className="row-span-2 grid grid-rows-subgrid gap-1 p-1 pt-3">
                <span className="text-muted-foreground ml-2 text-xs">Content</span>
                <ul>
                  {contentLinks.map((c, i) => (
                    <NavigationMenuLink key={i} asChild>
                      <Link href={c.href} className="grid grid-cols-[auto_1fr] items-center gap-2.5">
                        {c.icon}
                        <div className="text-foreground text-sm font-medium">{c.name}</div>
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
    </NavigationMenu>
  );
}

/* ---------- Shared helpers ---------- */
function ListItem(
  { title, description, children, href, ...props }:
  React.ComponentPropsWithoutRef<'li'> & { href: string; title: string; description?: string; }
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

/* ---------- Mobile helpers ---------- */
function MobileGroup({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="py-3">
      <button onClick={onToggle} className="flex w-full items-center justify-between py-2 text-lg">
        {label}
        <ChevronRight className={cn('size-4 transition-transform', open && 'rotate-90')} />
      </button>
      <div className={cn('grid gap-1 overflow-hidden transition-all', open ? 'mt-2 max-h-[1200px] opacity-100' : 'max-h-0 opacity-0')} aria-hidden={!open}>
        {children}
      </div>
    </div>
  );
}

function MobileList({ items }: { items: FeatureLink[] }) {
  return (
    <ul className="grid">
      {items.map((item, i) => (
        <li key={i}>
          <Link href={item.href} className="grid grid-cols-[auto_1fr] items-center gap-2 py-2">
            <span className="*:size-4 flex items-center justify-center">{item.icon}</span>
            <span className="text-base">{item.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
