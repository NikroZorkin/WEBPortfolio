import Image from 'next/image'
import { BentoCard } from '@/components/bento-card'
import { StaggerList } from '@/components/animations/stagger-list'
import { SectionReveal } from '@/components/animations/section-reveal'

// Placeholder project data - will be replaced with Contentlayer in CL epic
const projects = [
  {
    id: '1',
    title: 'Redesign + SEO for the Website',
    description: 'A website for selecting a stylist and updating a wardrobe. My tasks included optimizing SEO for the website, as well as a complete redesign and updating with a focus on minimalism and maximum simplicity for the client.',
    cover: '/project-styleleap.jpg',
    tags: ['Figma', 'Adobe Photoshop'],
    featured: true,
    link: 'https://www.upwork.com/freelancers/~01648f1c04b49f406f?p=1963226663592017920',
  },
  {
    id: '2',
    title: 'MVP app (Discord-like utility for gamers)',
    description: 'The screen is where squads vote on what game to play. A modern, minimal style with subtle gamer energy. Deliverable: 1 polished mobile screen (Figma).',
    cover: '/iPhone 15 Pro.jpg',
    tags: ['Figma'],
    featured: false,
    link: 'https://www.upwork.com/freelancers/~01648f1c04b49f406f?p=1963172177032921088',
  },
  {
    id: '3',
    title: 'Healthcare Dashboard',
    description: 'Data visualization for medical professionals',
    cover: '/placeholder-project.svg',
    tags: ['Dashboard', 'Healthcare'],
    featured: false,
    link: null,
  },
  {
    id: '4',
    title: 'Travel Booking Platform',
    description: 'Streamlined booking experience for wanderers',
    cover: '/placeholder-project.svg',
    tags: ['Web', 'Travel'],
    featured: false,
    link: null,
  },
  {
    id: '5',
    title: 'Fitness Tracking App',
    description: 'Personal trainer in your pocket',
    cover: '/placeholder-project.svg',
    tags: ['Mobile', 'Health'],
    featured: false,
    link: null,
  },
]

export function WorkSection() {
  return (
    <SectionReveal>
      <section id="work" className="min-h-screen px-4 pt-20 pb-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-fg md:text-5xl">
              Selected Work
            </h2>
            <p className="mt-4 text-lg text-muted-fg">
              A collection of projects showcasing design and problem-solving
            </p>
          </div>

          {/* Bento Grid for Projects with Stagger Animation (C4) */}
          <StaggerList className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {projects.map((project) => {
              const cardContent = (
                <div className="flex h-full w-full flex-col">
                  {/* Project Cover */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                    {project.cover.includes('placeholder') ? (
                      /* Placeholder Pattern */
                      <div className="absolute inset-0 flex items-center justify-center">
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
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    ) : (
                      <Image
                        src={project.cover}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="flex flex-1 flex-col justify-center p-6">
                    <h3 className="text-lg font-semibold text-card-fg">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-fg line-clamp-2">
                      {project.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-muted px-2 py-1 text-xs text-muted-fg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )

              return (
                <BentoCard
                  key={project.id}
                  colSpan={{ default: 1, md: 1, lg: 1 }}
                  rowSpan={2}
                  interactive
                  noPadding
                  className="group cursor-pointer overflow-hidden"
                >
                  {project.link ? (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full w-full"
                    >
                      {cardContent}
                    </a>
                  ) : (
                    cardContent
                  )}
                </BentoCard>
              )
            })}
          </StaggerList>
        </div>
      </section>
    </SectionReveal>
  )
}

