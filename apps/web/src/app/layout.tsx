import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import NavigationBar from '@/components/NavigationBar'
import FooterContact from '@/components/landing/FooterContact'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'VinaFlightControl — Ground Control Station',
    description:
        'Next-generation drone flight controller and ground control station built with VinaUAV.',
}

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            "@id": "https://vinauav.com/#website",
            url: "https://vinauav.com",
            name: "VinaUAV",
            description: "Nền tảng học lập trình Drone dành cho sinh viên - VinaUAV Flight Controller",
            inLanguage: ["vi", "en"],
        },
        {
            "@type": "Organization",
            "@id": "https://vinauav.com/#organization",
            name: "VinaUAV",
            url: "https://vinauav.com",
            description: "Vietnamese open-source drone flight controller for education.",
            foundingLocation: {
                "@type": "Country",
                name: "Vietnam",
            },
            areaServed: "Worldwide",
            contactPoint: {
                "@type": "ContactPoint",
                email: "quymom941478@gmail.com",
                telephone: "0817550271",
                contactType: "customer support",
                availableLanguage: ["Vietnamese", "English"],
            },
        },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <body
                className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
            >
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <main className="min-h-screen relative bg-white text-gray-900 selection:bg-slate-200 selection:text-gray-900 overflow-hidden font-sans">
                    <NavigationBar />
                    {children}
                    <FooterContact />

                </main>
            </body>
        </html>
    )
}
