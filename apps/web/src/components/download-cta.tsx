'use client'

import { motion } from 'framer-motion'
import { Button } from '@vinauav/ui'
import { DownloadCloud, Monitor, Command } from 'lucide-react'

export function DownloadCTA() {
    return (
        <section id="ecosystem" className="relative overflow-hidden bg-background py-32">
            {/* Intense Background Glow */}
            <div className="absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[150px]" />

            <div className="container relative z-10 mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-3xl rounded-3xl border border-primary/40 bg-card/40 p-12 backdrop-blur-xl shadow-hud-lg"
                >
                    <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 shadow-glow">
                        <DownloadCloud className="h-10 w-10 text-primary" />
                    </div>

                    <h2 className="mb-6 font-display text-4xl font-extrabold text-foreground sm:text-5xl">
                        Command Your Fleet
                    </h2>

                    <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
                        The VinaUAV Configurator is explicitly designed for Windows and macOS.
                        No more messy drivers, no more hidden un-flashable modes. Just plug in, tune, and fly.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="lg" className="h-14 gap-3 px-8 text-lg font-bold">
                                <Monitor className="h-5 w-5" /> Download for Windows
                            </Button>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="lg" variant="outline" className="h-14 gap-3 px-8 text-lg font-bold border-white/20 hover:bg-white/5">
                                <Command className="h-5 w-5" /> Download for macOS
                            </Button>
                        </motion.div>
                    </div>

                    <p className="mt-8 font-mono text-xs text-muted-foreground">
                        v2.0.1 Stable Release | Requires STM32 VCP Drivers
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
