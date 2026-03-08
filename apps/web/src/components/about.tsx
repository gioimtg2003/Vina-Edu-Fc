'use client'

import { motion } from 'framer-motion'
import { Activity, Zap, ShieldCheck, Crosshair } from 'lucide-react'

const features = [
    {
        title: 'Zero Latency Pipeline',
        description: 'End-to-end hardware optimization directly integrated with our VinaUAV OS to eliminate processing overhead.',
        icon: <Zap className="h-6 w-6 text-accent" />,
    },
    {
        title: 'Military-Grade Telemetry',
        description: 'Real-time spectral analysis and blackbox logging securely synced to your cloud dashboard.',
        icon: <Activity className="h-6 w-6 text-primary" />,
    },
    {
        title: 'Precision Targeting',
        description: 'Advanced PID tuning algorithms that lock your rates exactly where you want them, completely eliminating bounce-back.',
        icon: <Crosshair className="h-6 w-6 text-accent" />,
    },
    {
        title: 'Fail-Safe Cortex',
        description: 'Triple-redundant sensor fusion ensures your craft returns home safely, even in GPS-denied environments.',
        icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    },
]

export function About() {
    return (
        <section id="hardware" className="relative border-y border-white/5 bg-black py-24">
            {/* Geometric Grid Background */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'linear-gradient(to right, #1a202c 1px, transparent 1px), linear-gradient(to bottom, #1a202c 1px, transparent 1px)',
                    backgroundSize: '4rem 4rem'
                }}
            />

            <div className="container relative z-10 mx-auto px-6">
                <div className="mb-20 max-w-2xl">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-4 font-mono text-sm tracking-[0.2em] text-accent uppercase"
                    >
                        Intelligence inside
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
                    >
                        We didn&apos;t just build a board. <br />
                        <span className="text-muted-foreground">We built a central nervous system.</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 + 0.2 }}
                            className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm transition-colors hover:border-primary/50 hover:bg-white/[0.04]"
                        >
                            {/* Hover glow effect */}
                            <div className="absolute -inset-px -z-10 rounded-xl bg-gradient-to-b from-primary/20 to-transparent opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />

                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover:border-primary/30 group-hover:bg-primary/10 transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
                                {feature.title}
                            </h3>
                            <p className="text-sm font-medium leading-relaxed text-muted-foreground">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
