import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Local images only - no remote domains
    remotePatterns: [],
  },
}

export default nextConfig
