import { Button } from '@vinauav/ui'

export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-background px-6 py-20">
            {/* ── Header ── */}
            <div className="text-center">
                <p className="mb-2 font-mono text-xs tracking-[0.3em] text-accent uppercase">
                    VinaUAV Ground Control Station
                </p>
                <h1 className="font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
                    Vina
                    <span className="text-primary">Flight</span>
                    Control
                </h1>
                <p className="mt-4 max-w-xl text-muted-foreground">
                    Next-generation drone flight controller ecosystem. This page
                    verifies that the{' '}
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-accent">
                        @vinauav/ui
                    </code>{' '}
                    workspace package is correctly linked.
                </p>
            </div>

            {/* ── Button showcase ── */}
            <div className="flex flex-wrap items-center justify-center gap-3">
                <Button variant="default">Primary HUD</Button>
                <Button variant="accent">Neon Cyan</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Warning</Button>
            </div>

            {/* ── Status badge ── */}
            <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
                <span className="h-2 w-2 animate-hud-pulse rounded-full bg-accent" />
                <span className="font-mono text-xs text-primary">
                    UI PACKAGE LINKED — WORKSPACE OK
                </span>
            </div>
        </main>
    )
}
