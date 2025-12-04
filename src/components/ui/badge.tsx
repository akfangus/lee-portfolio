import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-thin transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-stone-900 text-stone-50  dark:bg-stone-50 dark:text-stone-900 ",
        secondary:
          "bg-stone-100 text-stone-900 0 dark:bg-stone-800 dark:text-stone-50 ",
        destructive:
          "bg-blue-500 text-stone-50  dark:bg-blue-900 dark:text-stone-50  ",
        outline:
          "text-stone-950 dark:text-stone-50 border border-stone-200 dark:border-stone-800",
        subtle:
          "bg-stone-200/60 text-stone-700 dark:bg-stone-700/60 dark:text-stone-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
