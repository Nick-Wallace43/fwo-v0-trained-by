'use client'

import { FlaskConical } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useTrainedBy } from '@/hooks/use-trainedby'

const links: { name: string; href: string }[] = [
  { name: 'Workouts', href: '/' },
  { name: 'Nutrition', href: '/nutrition' },
  { name: 'Supplements', href: '/supplements' },
  { name: 'Profile', href: '/profile' },
]

export function PrototypeNav() {
  const pathname = usePathname()
  const { replayOnboarding } = useTrainedBy()
  const [isShaking, setIsShaking] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsShaking(true)
      const timeout = setTimeout(() => setIsShaking(false), 1200)
      return () => clearTimeout(timeout)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  function handleReset() {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="fixed right-0 top-1/2 z-[9999] -translate-y-1/2">
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Prototype navigation"
          className="flex h-8 w-8 items-center justify-center rounded-l-md bg-[#000000] transition-opacity hover:opacity-90"
        >
          <FlaskConical
            className={cn('h-4 w-4 text-[#DCFEA8]', isShaking && 'animate-[proto-shake_1.2s_ease-in-out]')}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-64 [&_[role=menuitem]:hover]:bg-[#DCFEA8]"
        >
          <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Prototype Navigation
          </p>
          {links.map((link) => (
            <DropdownMenuItem key={link.href} asChild>
              <Link
                href={link.href}
                className={cn(pathname === link.href && 'bg-[#DCFEA8] text-black')}
              >
                {link.name}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={replayOnboarding}>Replay Onboarding</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleReset} className="text-destructive">
            Reset App Data
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
