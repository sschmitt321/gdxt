"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { PrimaryButton } from "@/components/primary-button"
import { Mail, Lock } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    // Mock login
    router.push("/home")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gradient mb-2">CryptoEx</h1>
          <p className="text-foreground-secondary">欢迎回来</p>
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
              placeholder="登录密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-foreground-muted"
            />
          </div>
        </div>

        <PrimaryButton onClick={handleLogin} className="mb-4">
          登录
        </PrimaryButton>

        <div className="text-center space-y-3">
          <p className="text-sm text-foreground-secondary">
            还没有账号？{" "}
            <Link href="/register" className="text-primary hover:underline">
              立即注册
            </Link>
          </p>
          <p className="text-xs text-foreground-muted">忘记密码请联系工作人员处理</p>
        </div>
      </motion.div>
    </div>
  )
}
