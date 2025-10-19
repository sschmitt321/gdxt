"use client"

import { useState } from "react"
import { TopBar } from "@/components/top-bar"
import { BottomNav } from "@/components/bottom-nav"
import { PrimaryButton } from "@/components/primary-button"
import { SecondaryButton } from "@/components/secondary-button"
import { ChevronDown, Clock, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { mockUser, mockTradeOrders } from "@/lib/mock-data"
import { formatCurrency, formatDate } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function TradePage() {
  const [activeTab, setActiveTab] = useState<"active" | "history" | "invite">("invite")
  const [tradeCode, setTradeCode] = useState("")
  const [selectedSymbol, setSelectedSymbol] = useState("BTC/USDT")
  const { toast } = useToast()

  const tradeAmount = mockUser.balance * 0.01

  const handleSubmitTrade = () => {
    if (!tradeCode) {
      toast({
        title: "请输入跟单码",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "跟单提交成功",
      description: `交易对: ${selectedSymbol}, 金额: ${formatCurrency(tradeAmount)} USDT`,
    })
  }

  return (
    <div className="min-h-screen pb-24">
      <TopBar title="交易" />

      <div className="p-4 max-w-lg mx-auto">
        {/* Trade Quota Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass rounded-2xl p-6 mb-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">今日跟单额度</h3>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">13:00 / 20:00</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div className="flex-1">
              <div className="h-2 bg-background-secondary rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-primary-dark w-0" />
              </div>
            </div>
            <span className="text-sm font-medium">0/2</span>
          </div>

          {mockUser.isNewUser && (
            <div className="p-3 rounded-xl bg-success/10 border border-success/20">
              <p className="text-xs text-success font-medium mb-1">🎁 新人加餐</p>
              <p className="text-xs text-foreground-secondary">
                连续5天，每天4次额外跟单机会（12:00、14:00、19:00、21:00）
              </p>
            </div>
          )}
        </motion.div>

        {/* Symbol Selector */}
        <div className="glass rounded-xl p-4 mb-4 flex items-center justify-between">
          <span className="font-semibold">{selectedSymbol}</span>
          <button className="flex items-center gap-1 text-primary">
            <span className="text-sm">切换</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* TradingView Placeholder */}
        <div className="glass rounded-2xl p-8 mb-4 flex flex-col items-center justify-center min-h-[200px]">
          <TrendingUp className="w-12 h-12 text-foreground-muted mb-3" />
          <p className="text-foreground-secondary text-center">{selectedSymbol} 实时行情</p>
          <p className="text-sm text-foreground-muted">(占位图表)</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {[
            { key: "active", label: "交割订单" },
            { key: "history", label: "历史订单" },
            { key: "invite", label: "邀请我的" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.key ? "bg-primary text-background" : "glass hover:bg-surface-hover"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "invite" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="glass rounded-xl p-4">
              <label className="block text-sm text-foreground-secondary mb-2">跟单码</label>
              <input
                type="text"
                placeholder="请输入跟单码"
                value={tradeCode}
                onChange={(e) => setTradeCode(e.target.value)}
                className="w-full bg-background-secondary rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-foreground-muted mt-2">跟单码限制时间与交易对，过期后无法使用</p>
            </div>

            <div className="glass rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground-secondary">跟单金额</span>
                <span className="text-sm text-foreground-muted">当前总金额的 1%</span>
              </div>
              <p className="text-2xl font-bold font-numeric text-primary">{formatCurrency(tradeAmount)} USDT</p>
              <p className="text-xs text-foreground-muted mt-2">
                预估利润: {formatCurrency(tradeAmount * 0.55)} USDT (50%-60%)
              </p>
            </div>

            <PrimaryButton onClick={handleSubmitTrade}>提交跟单</PrimaryButton>

            <div className="grid grid-cols-2 gap-3">
              <SecondaryButton disabled>发起跟单 (管理员)</SecondaryButton>
              <SecondaryButton>跟单历史</SecondaryButton>
            </div>
          </motion.div>
        )}

        {activeTab === "active" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {mockTradeOrders
              .filter((order) => order.status === "active")
              .map((order) => (
                <div key={order.id} className="glass rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">{order.symbol}</span>
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                      进行中
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-foreground-secondary">金额</span>
                      <span className="font-medium">{formatCurrency(order.amount)} USDT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground-secondary">跟单码</span>
                      <span className="font-mono text-xs">{order.tradeCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground-secondary">提交时间</span>
                      <span>{formatDate(order.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
          </motion.div>
        )}

        {activeTab === "history" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {mockTradeOrders
              .filter((order) => order.status === "settled")
              .map((order) => (
                <div key={order.id} className="glass rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">{order.symbol}</span>
                    <span className="px-3 py-1 rounded-full bg-success/20 text-success text-xs font-medium">
                      已结算
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-foreground-secondary">金额</span>
                      <span className="font-medium">{formatCurrency(order.amount)} USDT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground-secondary">利润</span>
                      <span className="font-medium text-success">+{formatCurrency(order.profit!)} USDT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground-secondary">结算时间</span>
                      <span>{formatDate(order.settledAt!)}</span>
                    </div>
                  </div>
                </div>
              ))}
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
