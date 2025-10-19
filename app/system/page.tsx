"use client"

import { TopBar } from "@/components/top-bar"
import { BottomNav } from "@/components/bottom-nav"
import { ChevronRight, HelpCircle, Bell, Info, Globe, Download, LogOut } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function SystemPage() {
  const router = useRouter()

  const menuItems = [
    { icon: HelpCircle, label: "帮助中心", href: "/system/help" },
    { icon: Bell, label: "系统公告", href: "/system/announcements" },
    { icon: Info, label: "关于我们", href: "/system/about" },
    { icon: Globe, label: "语言选择", href: "/system/language" },
    { icon: Download, label: "APP 下载", href: "/system/download" },
  ]

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <div className="min-h-screen pb-24">
      <TopBar title="系统" />

      <div className="p-4 max-w-lg mx-auto">
        <div className="space-y-2 mb-6">
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
              <ChevronRight className="w-5 h-5 text-foreground-secondary" />
            </motion.button>
          ))}
        </div>

        <div className="glass rounded-xl p-4 mb-4 text-center">
          <p className="text-sm text-foreground-secondary">版本号</p>
          <p className="font-mono text-foreground-muted">v1.0.0</p>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={handleLogout}
          className="w-full glass rounded-xl p-4 flex items-center justify-center gap-2 hover:bg-danger/10 hover:border-danger transition-colors active-scale"
        >
          <LogOut className="w-5 h-5 text-danger" />
          <span className="font-medium text-danger">退出登录</span>
        </motion.button>
      </div>

      <BottomNav />
    </div>
  )
}
