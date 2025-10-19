"use client"

import { TopBar } from "@/components/top-bar"
import { BottomNav } from "@/components/bottom-nav"
import { ChevronRight, Shield, Users, Key, Lock, Wallet } from "lucide-react"
import { motion } from "framer-motion"
import { mockUser } from "@/lib/mock-data"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()

  const menuItems = [
    { icon: Shield, label: "身份认证", href: "/profile/kyc", badge: mockUser.kycLevel === "none" ? "未认证" : "" },
    { icon: Users, label: "邀请好友", href: "/profile/referral" },
    { icon: Key, label: "提现密码", href: "/profile/withdraw-password" },
    { icon: Lock, label: "修改登录密码", href: "/profile/change-password" },
    { icon: Wallet, label: "绑定提现地址", href: "/profile/withdraw-address" },
  ]

  return (
    <div className="min-h-screen pb-24">
      <TopBar title="个人中心" showProfile={false} />

      <div className="p-4 max-w-lg mx-auto">
        {/* User Info Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-2xl font-bold">
              {mockUser.email[0].toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-lg">{mockUser.email}</p>
              <p className="text-sm text-foreground-secondary">ID: {mockUser.id}</p>
            </div>
          </div>
        </motion.div>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => router.push(item.href)}
              className="w-full glass rounded-xl p-4 flex items-center justify-between hover:bg-surface-hover transition-colors active-scale"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-primary" />
                <span className="font-medium">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="px-2 py-1 rounded-full bg-danger/20 text-danger text-xs">{item.badge}</span>
                )}
                <ChevronRight className="w-5 h-5 text-foreground-secondary" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
