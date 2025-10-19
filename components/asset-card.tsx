"use client"

import { TrendingUp, TrendingDown, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { formatCurrency, formatPercent } from "@/lib/utils"

interface AssetCardProps {
  balance: number
  change24h: number
  currency?: string
}

export function AssetCard({ balance, change24h, currency = "USDT" }: AssetCardProps) {
  const isPositive = change24h >= 0

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="glass rounded-2xl p-6 mb-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-foreground-secondary mb-1">总余额</p>
          <h2 className="text-4xl font-bold font-numeric text-balance">{formatCurrency(balance)}</h2>
        </div>
        <button className="flex items-center gap-1 px-3 py-1.5 rounded-full glass hover:bg-surface-hover transition-colors active-scale">
          <span className="text-sm font-medium">{currency}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        {isPositive ? (
          <TrendingUp className="w-4 h-4 text-success" />
        ) : (
          <TrendingDown className="w-4 h-4 text-danger" />
        )}
        <span className={`text-sm font-semibold ${isPositive ? "text-success" : "text-danger"}`}>
          {formatPercent(change24h)}
        </span>
        <span className="text-sm text-foreground-secondary">24h</span>
      </div>
    </motion.div>
  )
}
