'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Cpu, Menu, X } from 'lucide-react'
import { Button } from '@vinauav/ui'

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
                    ? 'border-b border-white/5 bg-background/80 backdrop-blur-md'
                    : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-6">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/20 text-primary">
                        <Cpu className="h-5 w-5" />
                    </div>
                    <span className="font-display text-lg font-bold tracking-tight text-foreground">
                        Vina<span className="text-primary">Flight</span>Control
                    </span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-8 md:flex">
                    <a href="#hardware" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                        Hardware
                    </a>
                    <a href="#ecosystem" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                        Ecosystem
                    </a>
                    <a href="#booking" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                        Expert Setup
                    </a>
                    <a href="#docs" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                        Documentation
                    </a>
                </nav>

                {/* CTA */}
                <div className="hidden items-center gap-4 md:flex">
                    <Button variant="ghost" className="text-muted-foreground">Sign In</Button>
                    <Button variant="accent" className="font-mono text-xs uppercase tracking-wider">
                        Configurator App
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="text-foreground md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-x-0 top-16 border-b border-white/5 bg-background/95 p-6 backdrop-blur-lg md:hidden"
                >
                    <nav className="flex flex-col gap-4 text-center">
                        <a href="#hardware" className="text-lg font-medium">Hardware</a>
                        <a href="#ecosystem" className="text-lg font-medium">Ecosystem</a>
                        <a href="#docs" className="text-lg font-medium">Docs</a>
                        <Button variant="accent" className="mt-4 w-full font-mono uppercase">
                            Open Configurator
                        </Button>
                    </nav>
                </motion.div>
            )}
        </header>
    )
}
