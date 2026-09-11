import Image from 'next/image'
import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

// Circular creator photo. Reused wherever a creator needs a compact visual
// token (exercise attribution chips, follow strip, onboarding, profile).
// Images live at /public/avatars/{influencerId}.png.
export function CreatorAvatar({
  id,
  name,
  size = 24,
  className,
  style,
}: {
  id: string
  name: string
  size?: number
  className?: string
  style?: CSSProperties
}) {
  return (
    <span
      className={cn('relative inline-flex shrink-0 overflow-hidden rounded-full ring-1 ring-primary/30', className)}
      style={{ width: size, height: size, ...style }}
    >
      <Image
        src={`/avatars/${id}.png`}
        alt={name}
        fill
        sizes={`${size}px`}
        className="object-cover"
      />
    </span>
  )
}
