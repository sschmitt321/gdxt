"use client"

import { User } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface TopBarProps {
  title?: string
  showProfile?: boolean
}

export function TopBar({ title = "CryptoEx", showProfile = true }: TopBarProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 glass border-b border-border safe-top"
    >
      <div className="flex items-center justify-between px-4 py-4 max-w-lg mx-auto">
        <h1 className="text-xl font-bold text-gradient">{title}</h1>
        {showProfile && (
          <Link
            href="/profile"
            className="p-2 rounded-full glass hover:bg-surface-hover transition-colors active-scale"
          >
            <User className="w-5 h-5 text-foreground-secondary" />
          </Link>
        )}
      </div>
    </motion.header>
  )
}
