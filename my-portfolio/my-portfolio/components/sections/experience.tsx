import { BentoCard } from '@/components/bento-card'
import { StaggerList } from '@/components/animations/stagger-list'
import { SectionReveal } from '@/components/animations/section-reveal'

export const experiences = [
  {
    company: 'Tech Startup Inc',
    title: 'Senior UX/UI Designer',
    period: '2021 - Present',
    description:
      'Leading design for a B2B SaaS platform, managing a team of 3 designers',
  },
  {
    company: 'Digital Agency',
    title: 'UX Designer',
    period: '2019 - 2021',
    description:
      'Designed mobile and web experiences for Fortune 500 clients',
  },
  {
    company: 'Freelance',
    title: 'UX/UI Designer',
    period: '2018 - 2019',
    description: 'Built portfolio through diverse projects and client work',
  },
]

export function ExperienceSection() {
  return (
    <SectionReveal>
      <section id="experience" className="min-h-[60vh] px-4 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-fg md:text-5xl">Experience</h2>
          </div>

          {/* Experience List with Stagger Animation (C4) */}
          <StaggerList className="grid grid-cols-1 gap-4 md:gap-6">
            {experiences.map((exp, index) => (
            <BentoCard key={index} size="md" className="md:col-span-1">
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-card-fg">
                    {exp.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {exp.company}
                  </p>
                </div>
                <span className="text-sm text-muted-fg">{exp.period}</span>
              </div>
              <p className="mt-3 text-sm text-muted-fg">{exp.description}</p>
            </BentoCard>
            ))}
          </StaggerList>
        </div>
      </section>
    </SectionReveal>
  )
}

