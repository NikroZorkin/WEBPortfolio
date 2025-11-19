import Image from 'next/image'
import { BentoCard } from '@/components/bento-card'

const testimonials = [
  {
    quote:
      'Jane transformed our product with her exceptional design skills. The user engagement increased by 40% after the redesign.',
    author: 'John Smith',
    company: 'Tech Startup Inc',
    avatar: '/placeholder-avatar.svg',
  },
  {
    quote:
      'Working with Jane was a fantastic experience. She listened to our needs and delivered beyond expectations.',
    author: 'Sarah Johnson',
    company: 'E-commerce Platform',
    avatar: '/placeholder-avatar.svg',
  },
  {
    quote:
      'Jane\'s attention to detail and user-centric approach made our app stand out in the market.',
    author: 'Michael Chen',
    company: 'Mobile App Startup',
    avatar: '/placeholder-avatar.svg',
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="min-h-[60vh] px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-fg md:text-5xl">
            Kind Words
          </h2>
          <p className="mt-4 text-lg text-muted-fg">
            What clients say about working with me
          </p>
        </div>

        {/* Grid layout (NO carousel/slider) */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <BentoCard key={index} size="sm">
              <div className="flex h-full flex-col">
                <p className="text-sm italic text-muted-fg">
                  "{testimonial.quote}"
                </p>
                <div className="mt-auto pt-6">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                      {/* Placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center bg-muted">
                        <svg
                          className="h-6 w-6 text-muted-fg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-card-fg">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-muted-fg">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  )
}

