import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { DownloadCTA } from '@/components/download-cta'
import { Footer } from '@/components/footer'

export default function HomePage() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Navbar />
            <main className="flex-1">
                <Hero />
                <About />
                <DownloadCTA />
            </main>
            <Footer />
        </div>
    )
}
