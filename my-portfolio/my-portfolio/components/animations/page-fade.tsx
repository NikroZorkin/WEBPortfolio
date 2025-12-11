'use client'

import { motion } from 'framer-motion'
import { type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

// ANIMATION RULE: Only transform/opacity - NO layout properties (width/height/top/left)

interface PageFadeProps {
  children: ReactNode
}

export function PageFade({ children }: PageFadeProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0.3 : 0.6,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  )
}

