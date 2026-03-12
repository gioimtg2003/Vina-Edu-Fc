import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import '../globals.css'
import NavigationBar from '@/components/NavigationBar'
import FooterContact from '@/components/landing/FooterContact'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

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

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode
    params: Promise<{ locale: string }>
}>) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale} className="dark" suppressHydrationWarning>
            <body
                className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
            >
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <NextIntlClientProvider messages={messages}>
                    <main className="min-h-screen relative bg-white text-gray-900 selection:bg-slate-200 selection:text-gray-900 overflow-hidden font-sans">
                        <NavigationBar />
                        {children}
                        <FooterContact />
                    </main>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
