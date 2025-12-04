"use client"

import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToggleButtonProps {
  isOpen: boolean
  onClick: () => void
  labelOpen?: string
  labelClose?: string
  className?: string
}

export function ToggleButton({
  isOpen,
  onClick,
  labelOpen = "접기",
  labelClose = "자세히보기",
  className,
}: ToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors mt-2 w-fit group cursor-pointer select-none",
        className
      )}
    >
      <span>{isOpen ? labelOpen : labelClose}</span>
      <ChevronDown
        className={cn(
          "w-4 h-4 transition-transform duration-300",
          isOpen ? "-rotate-180" : "rotate-0",
          isOpen
            ? "group-hover:-translate-y-0.5"
            : "group-hover:translate-y-0.5"
        )}
      />
    </button>
  )
}
