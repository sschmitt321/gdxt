"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface SecondaryButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export function SecondaryButton({ children, onClick, disabled, className }: SecondaryButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={cn(
        "w-full py-4 rounded-xl font-semibold transition-all",
        "glass border-2 border-border hover:border-primary",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "active-scale",
        className,
      )}
    >
      {children}
    </motion.button>
  )
}
