"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { PrimaryButton } from "@/components/primary-button"
import { Mail, Lock } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleRegister = () => {
    // Mock registration
    router.push("/onboarding")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gradient mb-2">创建账户</h1>
          <p className="text-foreground-secondary">开始您的交易之旅</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="glass rounded-xl p-4 flex items-center gap-3">
            <Mail className="w-5 h-5 text-foreground-secondary" />
            <input
              type="email"
              placeholder="邮箱地址"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-foreground-muted"
            />
          </div>

          <div className="glass rounded-xl p-4 flex items-center gap-3">
            <Lock className="w-5 h-5 text-foreground-secondary" />
            <input
              type="password"
              placeholder="设置密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-foreground-muted"
            />
          </div>

          <div className="glass rounded-xl p-4 flex items-center gap-3">
            <Lock className="w-5 h-5 text-foreground-secondary" />
            <input
              type="password"
              placeholder="确认密码"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-foreground-muted"
            />
          </div>
        </div>

        <PrimaryButton onClick={handleRegister} className="mb-4">
          注册
        </PrimaryButton>

        <div className="text-center">
          <p className="text-sm text-foreground-secondary">
            已有账号？{" "}
            <Link href="/login" className="text-primary hover:underline">
              立即登录
            </Link>
          </p>
        </div>

        <div className="mt-6 p-4 glass rounded-xl">
          <p className="text-xs text-foreground-muted text-center">
            聊天软件采用同邮箱注册。登录后默认无好友，需通过推荐人添加管理员为好友。
          </p>
        </div>
      </motion.div>
    </div>
  )
}
