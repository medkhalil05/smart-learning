import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "border-transparent bg-blue-600 text-white",
        secondary: "border-transparent bg-slate-100 text-slate-600",
        success: "border-transparent bg-emerald-50 text-emerald-700",
        warning: "border-transparent bg-amber-50 text-amber-700",
        danger: "border-transparent bg-red-50 text-red-700",
        info: "border-transparent bg-indigo-50 text-indigo-700",
        outline: "border-slate-200 text-slate-600",
        draft: "border-transparent bg-gray-100 text-gray-600",
        processing: "border-transparent bg-blue-50 text-blue-700",
        validation: "border-transparent bg-amber-50 text-amber-700",
        published: "border-transparent bg-emerald-50 text-emerald-700",
        approved: "border-transparent bg-emerald-50 text-emerald-700",
        rejected: "border-transparent bg-red-50 text-red-700",
        edited: "border-transparent bg-purple-50 text-purple-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
