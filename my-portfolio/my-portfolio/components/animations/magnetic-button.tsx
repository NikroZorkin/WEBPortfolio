'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

// ANIMATION RULE: Only transform/opacity - NO layout properties (width/height/top/left)
// FR2: Performance-optimized with will-change management and proper listener cleanup

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number // Max offset in pixels, default 8
}

export function MagneticButton({
  children,
  className,
  strength = 8,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [hasHoverSupport, setHasHoverSupport] = useState(true)
  const willChangeTimeoutRef = useRef<NodeJS.Timeout>()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 300 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  // Detect touch device and hover support (FR2: disable on hover:none)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      setIsTouchDevice(hasTouch)
      
      // Check if device supports hover
      const hoverQuery = window.matchMedia('(hover: hover)')
      setHasHoverSupport(hoverQuery.matches)
      
      const handleHoverChange = (e: MediaQueryListEvent) => {
        setHasHoverSupport(e.matches)
      }
      
      hoverQuery.addEventListener('change', handleHoverChange)
      return () => hoverQuery.removeEventListener('change', handleHoverChange)
    }
  }, [])

  // FR2: Manage will-change property - add on enter, remove 200ms after leave
  useEffect(() => {
    if (!ref.current) return

    if (isHovered) {
      // Add will-change when hovering starts
      ref.current.style.willChange = 'transform'
      
      // Clear any pending timeout
      if (willChangeTimeoutRef.current) {
        clearTimeout(willChangeTimeoutRef.current)
      }
    } else {
      // Remove will-change 200ms after hover ends to allow animation to complete
      willChangeTimeoutRef.current = setTimeout(() => {
        if (ref.current) {
          ref.current.style.willChange = 'auto'
        }
      }, 200)
    }

    return () => {
      if (willChangeTimeoutRef.current) {
        clearTimeout(willChangeTimeoutRef.current)
      }
    }
  }, [isHovered])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      x.set(0)
      y.set(0)
      if (willChangeTimeoutRef.current) {
        clearTimeout(willChangeTimeoutRef.current)
      }
    }
  }, [x, y])

  // FR2: Performance guard - disable magnetic effect if:
  // - Reduced motion preference
  // - Touch device
  // - No hover support (hover:none)
  if (prefersReducedMotion || isTouchDevice || !hasHoverSupport) {
    return <div className={className}>{children}</div>
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current || !isHovered) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // FR2: Cap offset at strength value (default 8px)
    const rawOffsetX = ((e.clientX - centerX) / rect.width) * strength * 2
    const rawOffsetY = ((e.clientY - centerY) / rect.height) * strength * 2
    
    const offsetX = Math.max(-strength, Math.min(strength, rawOffsetX))
    const offsetY = Math.max(-strength, Math.min(strength, rawOffsetY))

    x.set(offsetX)
    y.set(offsetY)
  }

  const handlePointerEnter = () => {
    setIsHovered(true)
  }

  const handlePointerLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: xSpring, y: ySpring }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </motion.div>
  )
}

