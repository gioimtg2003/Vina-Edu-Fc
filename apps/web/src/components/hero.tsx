'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Button } from '@vinauav/ui'
import { Download, Terminal } from 'lucide-react'
import Image from 'next/image'

export function Hero() {
    // 3D Tilt Effect Setup
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <section className="relative min-h-screen overflow-hidden bg-background pt-24 isolate">
            {/* HUD Scanline Overlay */}
            <div className="pointer-events-none absolute inset-0 z-10 opacity-30 hud-scanlines mix-blend-overlay" />

            {/* Background Glows */}
            <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
            <div className="absolute left-1/3 top-1/3 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[100px]" />

            <div className="container mx-auto grid min-h-[calc(100vh-6rem)] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
                {/* Copy / CTA */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="z-20 flex flex-col items-start gap-6"
                >
                    <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 backdrop-blur-md">
                        <span className="h-2 w-2 animate-hud-pulse rounded-full bg-accent" />
                        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
                            System Online · V1.0.0
                        </span>
                    </div>

                    <h1 className="font-display text-5xl font-extrabold leading-tight tracking-tighter text-foreground sm:text-7xl">
                        Unleash The <br />
                        <span className="bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                            Apex Predator
                        </span>
                    </h1>

                    <p className="max-w-xl text-lg text-muted-foreground">
                        Meet the VinaUAV H743. Engineered for uncompromising flight performance,
                        blazing-fast loop times, and integrated natively with our next-gen
                        desktop configurator ecosystem.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Button size="lg" variant="default" className="gap-2 font-mono uppercase tracking-wider">
                            <Download className="h-4 w-4" /> Download Configurator
                        </Button>
                        <Button size="lg" variant="outline" className="gap-2 font-mono uppercase tracking-wider backdrop-blur-sm">
                            <Terminal className="h-4 w-4" /> View Docs
                        </Button>
                    </div>

                    {/* Ticker Data */}
                    <div className="mt-8 flex gap-8 border-t border-white/10 pt-8">
                        <div>
                            <p className="font-mono text-xs text-muted-foreground uppercase">Loop Time</p>
                            <p className="font-mono text-xl font-bold text-accent">8k / 8k</p>
                        </div>
                        <div>
                            <p className="font-mono text-xs text-muted-foreground uppercase">Processor</p>
                            <p className="font-mono text-xl font-bold text-primary">STM32 H743</p>
                        </div>
                        <div>
                            <p className="font-mono text-xs text-muted-foreground uppercase">Gyro</p>
                            <p className="font-mono text-xl font-bold text-foreground">ICM-42688-P</p>
                        </div>
                    </div>
                </motion.div>

                {/* 3D Image Tilt Feature */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative z-20 flex items-center justify-center [perspective:1000px]"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <motion.div
                        style={{ rotateX, rotateY }}
                        className="relative h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] xl:h-[600px] xl:w-[600px] drop-shadow-2xl"
                    >
                        {/* The AI Generated Board Image */}
                        <Image
                            src="/fc-board.png"
                            alt="VinaUAV Flight Controller"
                            fill
                            className="object-contain drop-shadow-[0_0_50px_rgba(0,195,255,0.4)]"
                            priority
                        />

                        {/* Dynamic UI Overlay Badges on the board */}
                        <motion.div
                            className="absolute right-10 top-20 rounded bg-background/80 px-2 py-1 font-mono text-xs text-accent backdrop-blur-md border border-accent/20"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            MCU ACTIVE
                        </motion.div>
                        <motion.div
                            className="absolute bottom-20 left-10 rounded bg-background/80 px-2 py-1 font-mono text-xs text-primary backdrop-blur-md border border-primary/20"
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                        >
                            OSD CHIP SYNCED
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
