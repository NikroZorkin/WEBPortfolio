import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

export default function robots(): MetadataRoute.Robots {
  const isIndexingEnabled = process.env.NEXT_PUBLIC_ENABLE_INDEXING === 'true'

  if (!isIndexingEnabled) {
    // Disallow all robots when indexing is disabled
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}

