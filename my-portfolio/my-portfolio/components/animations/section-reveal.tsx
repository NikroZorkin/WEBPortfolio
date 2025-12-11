'use client'

import { motion, useInView } from 'framer-motion'
import { type ReactNode, useRef } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

// ANIMATION RULE: Only transform/opacity - NO layout properties (width/height/top/left)

// Modern smooth easing - Apple-style deceleration
const smoothEase = [0.22, 1, 0.36, 1]

interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function SectionReveal({ children, className, delay = 0 }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  
  // Trigger earlier with margin for smoother experience
  const isInView = useInView(ref, {
    once: true,
    amount: 0.05,
    margin: '0px 0px -100px 0px', // Start animation well before element is visible
  })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0, 
        y: prefersReducedMotion ? 0 : 20,
      }}
      animate={isInView 
        ? { opacity: 1, y: 0 } 
        : { opacity: 0, y: prefersReducedMotion ? 0 : 20 }
      }
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.55,
        delay: prefersReducedMotion ? 0 : delay,
        ease: smoothEase,
      }}
    >
      {children}
    </motion.div>
  )
}
