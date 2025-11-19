import { BentoCard } from '@/components/bento-card'
import { Figma, Palette, Smartphone } from 'lucide-react'
import { StaggerList } from '@/components/animations/stagger-list'
import { SectionReveal } from '@/components/animations/section-reveal'

const tools = [
  { name: 'Figma', icon: Figma },
  { name: 'Adobe XD', icon: Palette },
  { name: 'Sketch', icon: Palette },
  { name: 'Prototyping', icon: Smartphone },
]

const expertise = [
  'User Research',
  'Interaction Design',
  'Visual Design',
]

export function SkillsSection() {
  return (
    <SectionReveal>
      <section id="skills" className="min-h-[60vh] px-4 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-fg md:text-5xl">Skills</h2>
          </div>

          {/* Skills Grid with Stagger Animation (C4) */}
          <StaggerList className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">
            {tools.map((tool) => (
            <BentoCard
              key={tool.name}
              size="sm"
              interactive
              className="flex flex-col items-center justify-center text-center"
            >
              <tool.icon className="h-8 w-8 text-primary" />
              <p className="mt-3 text-sm font-medium text-card-fg">
                {tool.name}
              </p>
            </BentoCard>
            ))}

            {/* Expertise Chips */}
            {expertise.map((skill) => (
              <BentoCard
                key={skill}
                size="sm"
                className="flex items-center justify-center"
              >
                <p className="text-sm font-medium text-card-fg">{skill}</p>
              </BentoCard>
            ))}
          </StaggerList>
        </div>
      </section>
    </SectionReveal>
  )
}

