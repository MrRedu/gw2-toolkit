// Add the plugin to the Next.js configuration
import type { NextConfig } from 'next'

import { withIntlayer } from 'next-intlayer/server'

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
    ]
  },
}

export default withIntlayer(nextConfig)
