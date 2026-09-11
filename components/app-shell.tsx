'use client'

import { Dumbbell, Pill, Salad, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { PrototypeNav } from '@/components/prototype-nav'

const tabs = [
  { href: '/', label: 'Workouts', icon: Dumbbell },
  { href: '/nutrition', label: 'Nutrition', icon: Salad },
  { href: '/supplements', label: 'Supplements', icon: Pill },
  { href: '/profile', label: 'Profile', icon: User },
] as const

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="relative mx-auto flex min-h-svh w-full max-w-2xl flex-col border-x border-border">
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
        <div className="flex items-center gap-2 px-4 py-3">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Dumbbell className="size-4" />
          </span>
          <span className="font-display text-lg font-bold uppercase tracking-[0.2em]">
            Trained<span className="text-primary">By</span>
          </span>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <PrototypeNav />

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur"
      >
        <div className="mx-auto flex max-w-2xl items-stretch">
          {tabs.map((tab) => {
            const active =
              tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href)
            const Icon = tab.icon
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-semibold uppercase tracking-wide transition-colors',
                  active ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <Icon className="size-5" />
                {tab.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
