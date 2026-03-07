import * as React from 'react'
import { cn } from '../../lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Show a glowing HUD-style focus ring (default: true in dark mode via CSS) */
    hud?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, hud, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    // Base
                    'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm',
                    // Placeholder
                    'placeholder:text-muted-foreground',
                    // Focus — electric blue ring with optional HUD glow
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
                    // File input
                    'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
                    // Disabled
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    // HUD glow variant
                    hud && 'focus-visible:shadow-hud transition-shadow duration-200',
                    className,
                )}
                ref={ref}
                {...props}
            />
        )
    },
)
Input.displayName = 'Input'

export { Input }
