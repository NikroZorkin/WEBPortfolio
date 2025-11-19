import { siteConfig } from '@/lib/site-config'

interface Project {
  id: string
  title: string
  description: string
  cover: string
  tags: string[]
}

interface JsonLdProps {
  projects?: Project[]
}

export function JsonLd({ projects = [] }: JsonLdProps) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author.name,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    jobTitle: 'Web Designer & Developer',
    description: siteConfig.description,
    sameAs: [
      // Add social profiles when available
      // 'https://github.com/username',
      // 'https://linkedin.com/in/username',
      // 'https://twitter.com/username',
    ],
    knowsAbout: ['Web Design', 'UX/UI', 'Web Development', '3D Graphics', 'Interactive Design'],
  }

  // Only include ItemList if projects are provided
  const itemListSchema = projects.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Featured Projects',
    description: 'Portfolio of web design and development projects',
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        image: `${siteConfig.url}${project.cover}`,
        keywords: project.tags.join(', '),
        creator: {
          '@type': 'Person',
          name: siteConfig.author.name,
        },
      },
    })),
  } : null

  return (
    <>
      {/* Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />

      {/* ItemList Schema (if projects available) */}
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(itemListSchema),
          }}
        />
      )}
    </>
  )
}

