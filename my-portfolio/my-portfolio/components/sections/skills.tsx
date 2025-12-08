import { SectionReveal } from '@/components/animations/section-reveal'

export function SkillsSection() {
  return (
    <SectionReveal>
      <section id="skills" className="min-h-[60vh] px-4 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-fg md:text-5xl">Skills</h2>
          </div>

          {/* TODO: Add skill icons from devicon */}
          <div className="min-h-[300px]">
            {/* Empty space for future content */}
          </div>
        </div>
      </section>
    </SectionReveal>
  )
}
