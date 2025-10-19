"use client"

import { useState, useEffect } from "react"
import { TopBar } from "@/components/top-bar"
import { BottomNav } from "@/components/bottom-nav"
import { CoinListItem } from "@/components/coin-list-item"
import { mockCoins, updateCoinPrices } from "@/lib/mock-data"
import type { CoinPrice } from "@/lib/types"
import { motion } from "framer-motion"

export default function MarketPage() {
  const [coins, setCoins] = useState<CoinPrice[]>(mockCoins)

  useEffect(() => {
    const interval = setInterval(() => {
      setCoins((prev) => updateCoinPrices(prev))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen pb-24">
      <TopBar title="行情" />

      <div className="p-4 max-w-lg mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl p-4 mb-4">
          <h2 className="font-semibold mb-2">交割合约</h2>
          <p className="text-sm text-foreground-secondary">USDT 计价 · 实时更新</p>
        </motion.div>

        <div className="space-y-2">
          {coins.map((coin, index) => (
            <CoinListItem key={coin.symbol} coin={coin} index={index} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
