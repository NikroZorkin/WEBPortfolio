'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { BentoCard } from '@/components/bento-card'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import {
  SwatchIcon,
  LightBulbIcon,
  HandRaisedIcon,
  SparklesIcon,
  UserGroupIcon,
  BeakerIcon,
  MapIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline'

// Apple-style smooth easing
const smoothEase = [0.25, 0.4, 0.25, 1]

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1, margin: '0px 0px -80px 0px' })
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const headerVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: smoothEase,
      },
    },
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 35,
      scale: prefersReducedMotion ? 1 : 0.97,
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

  return (
    <section id="about" className="min-h-[60vh] px-4 py-24 md:px-8">
      <motion.div 
        ref={containerRef}
        className="mx-auto max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div className="mb-12" variants={headerVariants}>
          <h2 className="text-3xl font-bold text-fg md:text-5xl">About</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {/* Bio */}
          <motion.div className="md:col-span-2" variants={cardVariants}>
            <BentoCard size="md" className="h-full">
              <h3 className="flex items-center gap-2 text-xl font-semibold text-card-fg">
                Hi, I'm Danylo Zorkin <HandRaisedIcon className="h-6 w-6 text-primary" />
              </h3>
              <p className="mt-4 text-muted-fg">
                I'm a UX/UI designer focused on AI-driven products and clean, code-friendly interfaces. I'm comfortable moving between Figma, design systems, and front-end logic, creating experiences that look great and work well.
              </p>
              <p className="mt-4 text-muted-fg">
                I'm really curious about how AI can speed up research, brainstorming, and creative exploration — from quick UX ideas to polished UI designs. I enjoy working where design meets engineering, speaking both "designer" and "developer" to make teamwork easier and smarter.
              </p>
              <p className="mt-4 text-muted-fg">
                When I'm not designing, you'll usually find me testing new AI tools, improving my design process, learning more about coding, or diving into product and tech trends to stay ahead of the curve.
              </p>
            </BentoCard>
          </motion.div>

          {/* Photo */}
          <motion.div variants={cardVariants}>
            <BentoCard
              size="sm"
              noPadding
              className="relative overflow-hidden h-full min-h-[280px]"
            >
              <div className="relative h-full w-full">
                <Image
                  src="/IMG000 (2).jpg"
                  alt="About me"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  style={{ 
                    objectPosition: 'center 70%',
                    transform: 'scale(1.2) translateX(-8%)'
                  }}
                />
              </div>
            </BentoCard>
          </motion.div>

          {/* Interests */}
          <motion.div variants={cardVariants}>
            <BentoCard size="sm" className="h-full">
              <h3 className="text-base font-semibold text-card-fg">Interests</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-fg">
                <li className="flex items-center gap-2">
                  <SparklesIcon className="h-4 w-4 text-primary" />
                  AI-assisted design workflows
                </li>
                <li className="flex items-center gap-2">
                  <SwatchIcon className="h-4 w-4 text-primary" />
                  UX/UI for digital products
                </li>
                <li className="flex items-center gap-2">
                  <LightBulbIcon className="h-4 w-4 text-primary" />
                  Exploring new AI & design tools
                </li>
              </ul>
            </BentoCard>
          </motion.div>

          <motion.div variants={cardVariants}>
            <BentoCard size="sm" className="h-full">
              <h3 className="text-base font-semibold text-card-fg">Values</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-fg">
                <li className="flex items-center gap-2">
                  <HandRaisedIcon className="h-4 w-4 text-primary" />
                  Accessibility
                </li>
                <li className="flex items-center gap-2">
                  <SparklesIcon className="h-4 w-4 text-primary" />
                  Sustainability
                </li>
                <li className="flex items-center gap-2">
                  <UserGroupIcon className="h-4 w-4 text-primary" />
                  Collaboration
                </li>
              </ul>
            </BentoCard>
          </motion.div>

          <motion.div variants={cardVariants}>
            <BentoCard size="sm" className="h-full">
              <h3 className="text-base font-semibold text-card-fg">Hobbies</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-fg">
                <li className="flex items-center gap-2">
                  <BeakerIcon className="h-4 w-4 text-primary" />
                  Coffee Tasting
                </li>
                <li className="flex items-center gap-2">
                  <MapIcon className="h-4 w-4 text-primary" />
                  Hiking
                </li>
                <li className="flex items-center gap-2">
                  <BookOpenIcon className="h-4 w-4 text-primary" />
                  Reading
                </li>
              </ul>
            </BentoCard>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
