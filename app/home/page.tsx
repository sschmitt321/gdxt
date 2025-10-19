"use client"

import { useState, useEffect } from "react"
import { TopBar } from "@/components/top-bar"
import { BottomNav } from "@/components/bottom-nav"
import { AssetCard } from "@/components/asset-card"
import { CoinListItem } from "@/components/coin-list-item"
import { ArrowDownToLine, ArrowUpFromLine, Repeat, ArrowLeftRight } from "lucide-react"
import { motion } from "framer-motion"
import { mockUser, mockCoins, updateCoinPrices } from "@/lib/mock-data"
import type { CoinPrice } from "@/lib/types"
import Link from "next/link"

export default function HomePage() {
  const [coins, setCoins] = useState<CoinPrice[]>(mockCoins)
  const [filter, setFilter] = useState<"all" | "hot" | "gainers" | "losers">("all")

  useEffect(() => {
    const interval = setInterval(() => {
      setCoins((prev) => updateCoinPrices(prev))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const filteredCoins = coins.filter((coin) => {
    if (filter === "gainers") return coin.change24h > 0
    if (filter === "losers") return coin.change24h < 0
    if (filter === "hot") return Math.abs(coin.change24h) > 3
    return true
  })

  const actionButtons = [
    { icon: ArrowDownToLine, label: "充币", href: "/records/deposit", color: "from-primary to-primary-dark" },
    { icon: ArrowUpFromLine, label: "提币", href: "/records/withdraw", color: "from-primary to-primary-dark" },
    { icon: Repeat, label: "闪兑", href: "/records/swap", color: "from-primary to-primary-dark" },
    { icon: ArrowLeftRight, label: "划转", href: "/records/transfer", color: "from-primary to-primary-dark" },
  ]

  return (
    <div className="min-h-screen pb-24">
      <TopBar />

      <div className="p-4 max-w-lg mx-auto">
        <AssetCard balance={mockUser.balance} change24h={2.45} />

        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {actionButtons.map((button, index) => (
            <motion.div
              key={button.label}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={button.href}
                className="flex flex-col items-center gap-2 p-4 glass rounded-xl hover:bg-surface-hover transition-colors active-scale"
              >
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${button.color} flex items-center justify-center`}
                >
                  <button.icon className="w-6 h-6 text-background" />
                </div>
                <span className="text-xs font-medium">{button.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Favorites Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">收藏</h2>
            <Link href="/market" className="text-sm text-primary hover:underline">
              查看全部
            </Link>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {[
              { key: "all", label: "全部" },
              { key: "hot", label: "热门" },
              { key: "gainers", label: "涨幅榜" },
              { key: "losers", label: "跌幅榜" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  filter === tab.key ? "bg-primary text-background" : "glass hover:bg-surface-hover"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Coin List */}
          <div className="space-y-2">
            {filteredCoins.slice(0, 6).map((coin, index) => (
              <CoinListItem key={coin.symbol} coin={coin} index={index} />
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
