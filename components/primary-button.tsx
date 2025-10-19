"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface PrimaryButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: "button" | "submit"
}

export function PrimaryButton({ children, onClick, disabled, className, type = "button" }: PrimaryButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={cn(
        "w-full py-4 rounded-xl font-semibold text-background transition-all",
        "bg-gradient-to-r from-primary to-primary-dark",
        "hover:shadow-lg hover:shadow-primary/20",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "active-scale",
        className,
      )}
    >
      {children}
    </motion.button>
  )
}
