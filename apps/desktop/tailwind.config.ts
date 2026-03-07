import type { Config } from 'tailwindcss'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const uiConfig = require('@vinauav/ui/tailwind.config') as Config

const config: Config = {
    ...uiConfig,
    content: [
        './index.html',
        './src/**/*.{ts,tsx}',
        '../../packages/ui/src/**/*.{ts,tsx}',
    ],
}

export default config
