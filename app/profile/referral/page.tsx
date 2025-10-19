"use client"

import { useState } from "react"
import { ArrowLeft, QrCode, Copy, Users, Award, TrendingUp, Target } from "lucide-react"
import { motion } from "framer-motion"
import { mockUser, referralLevels } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { PrimaryButton } from "@/components/primary-button"
import { useToast } from "@/hooks/use-toast"

export default function ReferralPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [showQR, setShowQR] = useState(false)

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({ title: `${label}已复制` })
  }

  const handleSaveQR = () => {
    toast({ title: "二维码已保存（演示）" })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 glass border-b border-border">
        <div className="flex items-center gap-3 px-4 py-4 max-w-lg mx-auto">
          <button onClick={() => router.back()} className="p-2 rounded-full glass hover:bg-surface-hover active-scale">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">邀请好友</h1>
        </div>
      </div>

      <div className="p-4 max-w-lg mx-auto pb-8">
        {/* QR Code Section */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass rounded-2xl p-6 mb-4 text-center"
        >
          <div className="w-48 h-48 mx-auto mb-4 bg-white rounded-xl flex items-center justify-center">
            <QrCode className="w-32 h-32 text-background" />
          </div>
          <PrimaryButton onClick={handleSaveQR}>保存二维码</PrimaryButton>
        </motion.div>

        {/* Referral Info */}
        <div className="space-y-3 mb-6">
          <div className="glass rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground-secondary">我的邀请码</span>
              <button
                onClick={() => handleCopy(mockUser.referralCode, "邀请码")}
                className="flex items-center gap-1 text-primary active-scale"
              >
                <Copy className="w-4 h-4" />
                <span className="text-sm">复制</span>
              </button>
            </div>
            <p className="font-mono text-lg font-bold mt-2">{mockUser.referralCode}</p>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground-secondary">我的邀请链接</span>
              <button
                onClick={() => handleCopy(mockUser.referralLink, "邀请链接")}
                className="flex items-center gap-1 text-primary active-scale"
              >
                <Copy className="w-4 h-4" />
                <span className="text-sm">复制</span>
              </button>
            </div>
            <p className="text-xs text-foreground-muted mt-2 break-all">{mockUser.referralLink}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground-secondary">推荐人数</span>
            </div>
            <p className="text-2xl font-bold">{mockUser.teamCount}</p>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground-secondary">当前等级</span>
            </div>
            <p className="text-2xl font-bold">{mockUser.level}级</p>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm text-foreground-secondary">总收益</span>
            </div>
            <p className="text-2xl font-bold font-numeric">{formatCurrency(mockUser.totalEarnings)}</p>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground-secondary">团队人数</span>
            </div>
            <p className="text-2xl font-bold">{mockUser.teamCount}</p>
          </div>
        </div>

        {/* Rules Section */}
        <div className="glass rounded-2xl p-6 mb-6">
          <h3 className="font-bold text-lg mb-4">规则说明</h3>
          <div className="space-y-4 text-sm text-foreground-secondary">
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <p className="font-medium text-primary mb-1">推荐人奖励</p>
              <p>
                成功邀请1位并充值成功：获得 <span className="text-primary font-bold">10% 彩金</span>
              </p>
              <p className="text-xs mt-1">例：下线充值 1000U → 您获得 100U</p>
            </div>

            <div className="p-3 rounded-lg bg-success/10 border border-success/20">
              <p className="font-medium text-success mb-1">通知奖励</p>
              <p>
                通知管理员确认下线充值：<span className="text-success font-bold">额外 5%</span>
              </p>
              <p className="text-xs mt-1">否则 5% 发给您的上级</p>
            </div>

            <div className="p-3 rounded-lg bg-background-secondary rounded-lg">
              <p className="font-medium mb-1">被推荐人奖励</p>
              <p>
                充值次日获得 <span className="font-bold">10% 彩金</span>
              </p>
              <p className="text-xs mt-1">例：充值 1000U → 次日获得 100U</p>
            </div>

            <div className="p-3 rounded-lg bg-danger/10 border border-danger/20">
              <p className="font-medium text-danger mb-1">⚠️ 断链规则</p>
              <p>直接下线提现后，与您解除关系</p>
              <p className="text-xs mt-1">团队人数相应减少（含该下线的所有下级）</p>
            </div>
          </div>
        </div>

        {/* Level Table */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-4">团队等级</h3>
          <div className="space-y-3">
            {referralLevels.map((level) => (
              <div
                key={level.level}
                className={`p-4 rounded-xl border ${
                  mockUser.level === level.level
                    ? "bg-primary/10 border-primary"
                    : "bg-background-secondary border-border"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold">{level.name}</span>
                  {mockUser.level === level.level && (
                    <span className="px-2 py-1 rounded-full bg-primary text-background text-xs">当前等级</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-foreground-secondary">
                  <p>直邀: {level.directReferrals}人</p>
                  <p>团队: {level.teamSize}人</p>
                  <p>奖励: {level.oneTimeReward}U</p>
                  <p>分红: {level.dividendRate}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
