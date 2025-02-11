import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['assets.aceternity.com', 'images.unsplash.com', 'api.microlink.io'], // Add Unsplash domain here
  },
  "extends": ["next", "eslint:recommended", "plugin:react/recommended", "plugin:react-hooks/recommended"],
  "rules": {
    "react-hooks/exhaustive-deps": "off" 
   }, // Disables the rule
  // other config options can go here
}

export default nextConfig