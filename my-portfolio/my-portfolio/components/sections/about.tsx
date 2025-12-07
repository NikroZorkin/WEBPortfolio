import Image from 'next/image'
import { BentoCard } from '@/components/bento-card'
import {
  SwatchIcon,
  LightBulbIcon,
  DevicePhoneMobileIcon,
  HandRaisedIcon,
  SparklesIcon,
  UserGroupIcon,
  BeakerIcon,
  MapIcon,
  BookOpenIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'

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
            <h3 className="flex items-center gap-2 text-xl font-semibold text-card-fg">
              Hi, I'm Jane <HandRaisedIcon className="h-6 w-6 text-primary" />
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
                <UserCircleIcon className="h-16 w-16 text-primary" />
              </div>
            </div>
          </BentoCard>

          {/* Interests */}
          <BentoCard size="sm">
            <h3 className="text-base font-semibold text-card-fg">Interests</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-fg">
              <li className="flex items-center gap-2">
                <SwatchIcon className="h-4 w-4 text-primary" />
                Visual Design
              </li>
              <li className="flex items-center gap-2">
                <LightBulbIcon className="h-4 w-4 text-primary" />
                User Psychology
              </li>
              <li className="flex items-center gap-2">
                <DevicePhoneMobileIcon className="h-4 w-4 text-primary" />
                Mobile-First Design
              </li>
            </ul>
          </BentoCard>

          <BentoCard size="sm">
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

          <BentoCard size="sm">
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
        </div>
      </div>
    </section>
  )
}

