"use client"

import { motion } from "framer-motion"
import type { CoinPrice } from "@/lib/types"
import { formatCurrency, formatPercent } from "@/lib/utils"
import Link from "next/link"

interface CoinListItemProps {
  coin: CoinPrice
  index: number
}

export function CoinListItem({ coin, index }: CoinListItemProps) {
  const isPositive = coin.change24h >= 0

  return (
    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.05 }}>
      <Link
        href={`/trade/${coin.symbol.replace("/", "-")}`}
        className="flex items-center justify-between p-4 glass rounded-xl hover:bg-surface-hover transition-colors active-scale"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-lg font-bold">
            {coin.logo}
          </div>
          <div>
            <p className="font-semibold">{coin.symbol}</p>
            <p className="text-xs text-foreground-secondary">{coin.name}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="font-semibold font-numeric">${formatCurrency(coin.price)}</p>
          <p className={`text-sm font-medium ${isPositive ? "text-success" : "text-danger"}`}>
            {formatPercent(coin.change24h)}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
