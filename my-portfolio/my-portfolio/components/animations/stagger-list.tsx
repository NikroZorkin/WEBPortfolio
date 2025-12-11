'use client'

import { motion, useInView } from 'framer-motion'
import { type ReactNode, useRef } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

// ANIMATION RULE: Only transform/opacity - NO layout properties (width/height/top/left)

interface StaggerListProps {
  children: ReactNode
  className?: string
}

export function StaggerList({ children, className }: StaggerListProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(ref, {
    once: true,
    amount: 0.15,
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={item}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}

