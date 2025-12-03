import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Local images only - no remote domains
    remotePatterns: [],
  },
  experimental: {
    turbo: {
      // Explicitly set root to prevent lockfile detection issues
      root: __dirname,
    },
  },
}

export default nextConfig
