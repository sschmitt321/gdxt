"use client"

import { TopBar } from "@/components/top-bar"
import { BottomNav } from "@/components/bottom-nav"
import { ArrowDownToLine, ArrowUpFromLine, Repeat, ArrowLeftRight } from "lucide-react"
import { motion } from "framer-motion"
import { mockUser } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

export default function AssetsPage() {
  const actionButtons = [
    { icon: ArrowDownToLine, label: "充币", href: "/records/deposit" },
    { icon: ArrowUpFromLine, label: "提币", href: "/records/withdraw" },
    { icon: Repeat, label: "闪兑", href: "/records/swap" },
    { icon: ArrowLeftRight, label: "划转", href: "/records/transfer" },
  ]

  return (
    <div className="min-h-screen pb-24">
      <TopBar title="资产" />

      <div className="p-4 max-w-lg mx-auto">
        {/* Total Assets */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass rounded-2xl p-6 mb-6"
        >
          <p className="text-sm text-foreground-secondary mb-2">账户总资产</p>
          <h2 className="text-4xl font-bold font-numeric mb-4">
            {formatCurrency(mockUser.balance)}
            <span className="text-lg text-foreground-secondary ml-2">USDT</span>
          </h2>

          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <div>
              <p className="text-xs text-foreground-secondary mb-1">今日收益</p>
              <p className="text-lg font-semibold text-success">+{formatCurrency(125.8)}</p>
            </div>
          </div>
        </motion.div>

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
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                  <button.icon className="w-6 h-6 text-background" />
                </div>
                <span className="text-xs font-medium">{button.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Account Details */}
        <div>
          <h3 className="font-semibold mb-3">我的账户</h3>
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="glass rounded-xl p-4"
            >
              <p className="text-sm text-foreground-secondary mb-2">币币账户</p>
              <p className="text-xl font-bold font-numeric">{formatCurrency(mockUser.spotBalance)}</p>
              <p className="text-xs text-foreground-muted mt-1">USDT</p>
            </motion.div>

            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="glass rounded-xl p-4">
              <p className="text-sm text-foreground-secondary mb-2">交割合约</p>
              <p className="text-xl font-bold font-numeric">{formatCurrency(mockUser.contractBalance)}</p>
              <p className="text-xs text-foreground-muted mt-1">USDT</p>
            </motion.div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
