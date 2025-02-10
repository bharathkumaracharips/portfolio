import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['assets.aceternity.com', 'images.unsplash.com', 'api.microlink.io'], // Add Unsplash domain here
  },
  // other config options can go here
}

export default nextConfig