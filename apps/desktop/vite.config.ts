import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(async () => ({
    plugins: [react()],

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },

    // Vite dev server options — Tauri expects a specific port
    server: {
        port: 1420,
        strictPort: true,
        host: process.env.TAURI_DEV_HOST || false,
        hmr: process.env.TAURI_DEV_HOST
            ? {
                protocol: 'ws',
                host: process.env.TAURI_DEV_HOST,
                port: 1421,
            }
            : undefined,
    },
}))
