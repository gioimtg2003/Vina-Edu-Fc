import { Cpu } from 'lucide-react'

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black py-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div className="flex items-center gap-3">
                        <Cpu className="h-6 w-6 text-muted-foreground" />
                        <span className="font-display font-bold text-muted-foreground">
                            Vina<span className="text-primary/70">Flight</span>Control
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="#" className="font-mono text-sm text-muted-foreground hover:text-primary">Github</a>
                        <a href="#" className="font-mono text-sm text-muted-foreground hover:text-primary">Discord</a>
                        <a href="#" className="font-mono text-sm text-muted-foreground hover:text-primary">Docs</a>
                    </div>
                </div>

                <div className="mt-8 text-center md:text-left">
                    <p className="font-mono text-xs text-muted-foreground/50">
                        © {new Date().getFullYear()} VinaUAV. All systems operational.
                    </p>
                </div>
            </div>
        </footer>
    )
}
