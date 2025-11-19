import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const isIndexingEnabled = process.env.NEXT_PUBLIC_ENABLE_INDEXING === 'true'

  // If indexing is disabled, return empty sitemap
  if (!isIndexingEnabled) {
    return []
  }

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    // Add more pages as needed
  ]
}

