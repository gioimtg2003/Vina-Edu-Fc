'use client'

// ── Components ──────────────────────────────────────────────────────────────
export { Button, buttonVariants } from './components/ui/button'
export type { ButtonProps } from './components/ui/button'

export { Input } from './components/ui/input'
export type { InputProps } from './components/ui/input'

export { Label } from './components/ui/label'

export * from './components/ui/tabs'
export * from './components/ui/breadcrumb'
export * from './components/ui/carousel'

export {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    useFormField,
} from './components/ui/form'

// ── Utilities ──────────────────────────────────────────────────────────────
export { cn } from './lib/utils'

// ── Re-exports for consumers ───────────────────────────────────────────────
// Zod and react-hook-form are re-exported so consumers share the same instance
export { z } from 'zod'
export * from 'react-hook-form'
export { zodResolver } from '@hookform/resolvers/zod'
