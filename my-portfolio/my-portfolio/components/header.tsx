'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { trackEvent, AnalyticsEvents } from '@/lib/analytics'

const navItems = [
  { href: '#hero', label: 'Home' },
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    // Use IntersectionObserver instead of scroll event listener (better INP)
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When sentinel exits viewport (not intersecting), header should blur
        setIsScrolled(!entry.isIntersecting)
      },
      {
        threshold: 0,
        rootMargin: '0px',
      }
    )

    observer.observe(sentinel)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Sentinel element at the top of page */}
      <div ref={sentinelRef} className="absolute top-0 h-px w-full" />

      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'border-b border-border bg-bg/80 backdrop-blur-md'
            : 'bg-transparent'
        }`}
        style={{
          paddingInline: 'max(1rem, env(safe-area-inset-left))',
        }}
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo/Name */}
          <a
            href="#hero"
            className="text-lg font-semibold text-fg transition-colors hover:text-primary"
          >
            Portfolio
          </a>

          {/* Navigation Links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-fg transition-colors hover:bg-muted hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              const newTheme = theme === 'dark' ? 'light' : 'dark'
              setTheme(newTheme)
              trackEvent(AnalyticsEvents.THEME_TOGGLE, { theme: newTheme })
            }}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-card-fg transition-colors hover:bg-accent hover:text-accent-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
        </nav>
      </header>
    </>
  )
}

