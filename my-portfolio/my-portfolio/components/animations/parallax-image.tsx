'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

// ANIMATION RULE: Only transform/opacity - NO layout properties (width/height/top/left)
// FR2: Performance-optimized with capped translateY (8-12px) and hover:none detection

interface ParallaxImageProps {
  children: ReactNode
  className?: string
  strength?: number // Parallax offset in pixels, default 10px (capped at 8-12px range)
}

export function ParallaxImage({
  children,
  className,
  strength = 10,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const motionRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [hasHoverSupport, setHasHoverSupport] = useState(true)

  // FR2: Detect touch device, screen size, and hover support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      setIsTouchDevice(hasTouch)
      
      // Check hover support (disable parallax on hover:none devices)
      const hoverQuery = window.matchMedia('(hover: hover)')
      setHasHoverSupport(hoverQuery.matches)
      
      const checkDesktop = () => {
        setIsDesktop(window.innerWidth >= 768) // md breakpoint
      }
      
      checkDesktop()
      
      const handleHoverChange = (e: MediaQueryListEvent) => {
        setHasHoverSupport(e.matches)
      }
      
      window.addEventListener('resize', checkDesktop)
      hoverQuery.addEventListener('change', handleHoverChange)
      
      return () => {
        window.removeEventListener('resize', checkDesktop)
        hoverQuery.removeEventListener('change', handleHoverChange)
      }
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // FR2: Cap translateY at 8-12px (using strength parameter, default 10px)
  // Transform scroll progress to parallax offset in pixels (not percentage)
  const clampedStrength = Math.max(8, Math.min(12, strength))
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-clampedStrength, clampedStrength]
  )

  // FR2: Manage will-change - only set when element is in viewport
  useEffect(() => {
    if (!motionRef.current) return

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (!motionRef.current) return
      
      // Add will-change when element is near viewport (0.1 to 0.9 progress)
      if (latest > 0.1 && latest < 0.9) {
        motionRef.current.style.willChange = 'transform'
      } else {
        motionRef.current.style.willChange = 'auto'
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  // FR2: Performance guard - disable parallax if:
  // - Reduced motion preference
  // - Touch device
  // - Mobile viewport
  // - No hover support (hover:none)
  if (prefersReducedMotion || isTouchDevice || !isDesktop || !hasHoverSupport) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        ref={motionRef}
        style={{ y }}
      >
        {children}
      </motion.div>
    </div>
  )
}

