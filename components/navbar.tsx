'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ChevronRight } from 'lucide-react';

import { ThemeToggle } from './theme-toggle';
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

import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const navLinks = [
    {
      label: 'Features',
      href: '#features',
      dropdownItems: [
        {
          title: 'Hosting & Custom Domains Included',
          href: '/pricing',
          description:
            'No Github or database to configure, share your AI product immediately with your audience',
        },
        {
          title: 'Truely No-Code',
          href: '/pricing',
          description:
            'Not low-code, NO-CODE. Built for people with expertise elsewhere, and people to serve now.',
        },
        {
          title: 'Custom Branding',
          href: '/pricing',
          description:
            'Keep every pixel on-brand with custom styling, drag-and-drop layouts, and smart templates',
        },
        {
          title: 'Launch In Minutes, Not Weeks',
          href: '/pricing',
          description:
            'Go from blank canvas to fully branded AI Product in minutes, guided by AI and our easy to use interface',
        },
      ],
    },
    { label: 'Pricing', href: '/pricing' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <header className="relative z-50 border-b backdrop-blur-sm">
      {/* Beta Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-center text-sm text-white">
        <span className="font-medium">🚀 We're in Beta!</span>
        <span className="mx-2">|</span>
        <span>Coming soon - </span>
        <Link
          href="/contact"
          className="font-medium underline hover:no-underline"
        >
          Get early access
        </Link>
      </div>

      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/icon.png"
              alt="icon"
              width={32}
              height={32}
              className="pr-1 dark:invert"
            />
            <Image
              src="/logo.svg"
              alt="logo"
              width={100}
              height={32}
              className="dark:invert"
            />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden items-center gap-8 lg:flex">
            <NavigationMenuList>
              {navLinks.map((link) =>
                link.dropdownItems ? (
                  <NavigationMenuItem key={link.label}>
                    <NavigationMenuTrigger className="text-primary lg:text-base">
                      {link.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="w-[400px] p-4">
                        {link.dropdownItems.map((item) => (
                          <li key={item.title}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex items-center gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                              >
                                <div>
                                  <div className="text-sm leading-none font-medium">
                                    {item.title}
                                  </div>
                                  <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={link.label}>
                    <Link
                      href={link.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'text-primary lg:text-base',
                        pathname === link.href && 'text-muted-foreground',
                      )}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuItem>
                ),
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth Buttons - Login + Beta CTA */}
          <div className="flex items-center gap-1 lg:gap-2.5">
            {/* Theme Toggle - Desktop Only */}
            <div
              className={`hidden transition-opacity duration-300 lg:block ${isMenuOpen ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
            >
              <ThemeToggle />
            </div>

            {/* Login Link - Desktop Only */}
            <Link
              href="https://app.productised.ai/login"
              className={`hidden transition-opacity duration-300 lg:block ${isMenuOpen ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
            >
              <Button variant="outline" className="text-primary">
                Login
              </Button>
            </Link>

            {/* Get Early Access CTA - Desktop Only */}
            <Link
              href="/contact"
              className={`hidden transition-opacity duration-300 lg:block ${isMenuOpen ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
            >
              <Button className="gap-1">
                Get Early Access
                <ChevronRight className="size-4" />
              </Button>
            </Link>

            {/* Hamburger Menu Button (Mobile Only) */}
            <button
              className="text-muted-foreground relative flex h-8 w-8 lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <div className="absolute top-1/2 left-1/2 block w-[18px] -translate-x-1/2 -translate-y-1/2 transform">
                <span
                  aria-hidden="true"
                  className={`absolute block h-0.5 w-full transform rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}
                ></span>
                <span
                  aria-hidden="true"
                  className={`absolute block h-0.5 w-full transform rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}
                ></span>
                <span
                  aria-hidden="true"
                  className={`absolute block h-0.5 w-full transform rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`bg-background fixed inset-0 top-full container flex h-[calc(100vh-64px)] flex-col transition-all duration-300 ease-in-out lg:hidden ${
          isMenuOpen
            ? 'visible translate-x-0 opacity-100'
            : 'invisible translate-x-full opacity-0'
        }`}
      >
        <div className="my-8 space-y-2">
          <div className="mb-4 flex justify-center lg:hidden">
            <ThemeToggle />
          </div>
          <Link
            href="https://app.productised.ai/login"
            className="block"
            onClick={() => setIsMenuOpen(false)}
          >
            <Button variant="outline" size="sm" className="w-full">
              Login
            </Button>
          </Link>
          <Link
            href="/contact"
            className="block"
            onClick={() => setIsMenuOpen(false)}
          >
            <Button size="sm" className="w-full">
              Get Early Access
            </Button>
          </Link>
        </div>
        <nav className="mt-3 flex flex-1 flex-col gap-6">
          {navLinks.map((link) =>
            link.dropdownItems ? (
              <div key={link.label} className="">
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === link.label ? null : link.label,
                    )
                  }
                  className="text-primary flex w-full items-center justify-between text-lg font-medium tracking-[-0.36px]"
                >
                  {link.label}
                  <ChevronRight
                    className={cn(
                      'h-4 w-4 transition-transform',
                      openDropdown === link.label ? 'rotate-90' : '',
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'ml-4 space-y-3 overflow-hidden transition-all',
                    openDropdown === link.label
                      ? 'mt-3 max-h-[1000px] opacity-100'
                      : 'max-h-0 opacity-0',
                  )}
                >
                  {link.dropdownItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="hover:bg-accent flex items-start gap-3 rounded-md p-2"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setOpenDropdown(null);
                      }}
                    >
                      <div>
                        <div className="text-primary font-medium">
                          {item.title}
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'text-primary text-lg tracking-[-0.36px]',
                  pathname === link.href && 'text-muted-foreground',
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
