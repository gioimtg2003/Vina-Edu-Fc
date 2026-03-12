import tailwindAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
        './src/**/*.{ts,tsx}',
        // Consumers extend this array with their own paths
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: { '2xl': '1400px' },
        },
        extend: {
            // ── Aviation / HUD color palette ─────────────────────────────────────
            colors: {
                // Base neutrals (dark cockpit)
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',

                // Brand — electric blue (HUD primary)
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                // Accent — neon cyan (radar sweep, altitude indicators)
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                // Secondary — muted slate (panel surfaces)
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                // Status colors
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                warning: {
                    DEFAULT: 'hsl(40 95% 55%)',
                    foreground: 'hsl(40 10% 10%)',
                },
                success: {
                    DEFAULT: 'hsl(145 65% 42%)',
                    foreground: 'hsl(145 10% 98%)',
                },

                // Surface tokens
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
            },

            // ── Typography ────────────────────────────────────────────────────────
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
                display: ['Outfit', 'Inter', 'sans-serif'],
            },

            // ── Border radius ─────────────────────────────────────────────────────
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },

            // ── Keyframes & animations ────────────────────────────────────────────
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
                // HUD-style radar sweep
                'radar-sweep': {
                    '0%': { transform: 'rotate(0deg)', opacity: '0.8' },
                    '100%': { transform: 'rotate(360deg)', opacity: '0.8' },
                },
                // Pulsing "active" indicator
                'hud-pulse': {
                    '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 hsl(195 100% 50% / 0.4)' },
                    '50%': { opacity: '0.8', boxShadow: '0 0 0 8px hsl(195 100% 50% / 0)' },
                },
                'fade-in': {
                    from: { opacity: '0', transform: 'translateY(4px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'radar-sweep': 'radar-sweep 4s linear infinite',
                'hud-pulse': 'hud-pulse 2s ease-in-out infinite',
                'fade-in': 'fade-in 0.3s ease-out',
            },

            // ── Box shadows (glowing HUD effect) ──────────────────────────────────
            boxShadow: {
                hud: '0 0 12px 2px hsl(195 100% 50% / 0.25)',
                'hud-lg': '0 0 24px 4px hsl(195 100% 50% / 0.35)',
                glow: '0 0 8px 1px hsl(var(--primary) / 0.5)',
            },
        },
    },
    plugins: [tailwindAnimate],
};
