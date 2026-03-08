import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    // Transpile the shared UI package so Next.js can process its TypeScript source
    transpilePackages: ['@vinauav/ui'],
    output: 'standalone',
}

export default nextConfig
