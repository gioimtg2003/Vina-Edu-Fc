import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    // Transpile the shared UI package so Next.js can process its TypeScript source
    transpilePackages: ['@vinauav/ui'],
    output: 'standalone',
}

export default withNextIntl(nextConfig)
