import Image from 'next/image'
import { BentoCard } from '@/components/bento-card'

export function AboutSection() {
  return (
    <section id="about" className="min-h-[60vh] px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-fg md:text-5xl">About</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {/* Bio */}
          <BentoCard size="md" className="md:col-span-2">
            <h3 className="text-xl font-semibold text-card-fg">
              Hi, I'm Jane 👋
            </h3>
            <p className="mt-4 text-muted-fg">
              I'm a freelance UX/UI designer with 5+ years of experience
              creating beautiful, functional digital products. My passion lies
              in understanding user needs and translating them into intuitive
              designs that make a difference.
            </p>
            <p className="mt-4 text-muted-fg">
              When I'm not designing, you'll find me exploring new coffee shops,
              hiking mountain trails, or experimenting with the latest design
              tools.
            </p>
          </BentoCard>

          {/* Photo */}
          <BentoCard
            size="sm"
            noPadding
            aspectRatio="square"
            className="relative"
          >
            <div className="relative h-full w-full">
              <Image
                src="/placeholder-about.svg"
                alt="About Jane Doe"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              {/* Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <svg
                  className="h-16 w-16 text-muted-fg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </BentoCard>

          {/* Interests */}
          <BentoCard size="sm">
            <h3 className="text-base font-semibold text-card-fg">Interests</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-fg">
              <li>🎨 Visual Design</li>
              <li>🧠 User Psychology</li>
              <li>📱 Mobile-First Design</li>
            </ul>
          </BentoCard>

          <BentoCard size="sm">
            <h3 className="text-base font-semibold text-card-fg">Values</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-fg">
              <li>♿ Accessibility</li>
              <li>🌱 Sustainability</li>
              <li>🤝 Collaboration</li>
            </ul>
          </BentoCard>

          <BentoCard size="sm">
            <h3 className="text-base font-semibold text-card-fg">Hobbies</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-fg">
              <li>☕ Coffee Tasting</li>
              <li>🥾 Hiking</li>
              <li>📚 Reading</li>
            </ul>
          </BentoCard>
        </div>
      </div>
    </section>
  )
}

