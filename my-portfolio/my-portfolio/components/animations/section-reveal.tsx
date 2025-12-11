'use client'

import { motion, useInView, type Variants } from 'framer-motion'
import { type ReactNode, useRef, Children, isValidElement } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

// ANIMATION RULE: Only transform/opacity - NO layout properties (width/height/top/left)

// Apple-style smooth easing
const smoothEase = [0.25, 0.4, 0.25, 1]

interface SectionRevealProps {
  children: ReactNode
  className?: string
  stagger?: boolean // Enable staggered children animation
  staggerDelay?: number
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
}

const simpleVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: smoothEase,
    },
  },
}

export function SectionReveal({ 
  children, 
  className, 
  stagger = false,
  staggerDelay = 0.1,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  
  const isInView = useInView(ref, {
    once: true,
    amount: 0.08,
    margin: '0px 0px -100px 0px',
  })

  // Reduced motion - instant reveal
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  // Staggered animation for grids/lists
  if (stagger) {
    const customContainerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: 0.1,
        },
      },
    }

    return (
      <motion.div
        ref={ref}
        className={className}
        variants={customContainerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return (
              <motion.div variants={itemVariants}>
                {child}
              </motion.div>
            )
          }
          return child
        })}
      </motion.div>
    )
  }

  // Simple fade-up for sections
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={simpleVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

// Export for direct use in components
export { itemVariants, containerVariants, smoothEase }
