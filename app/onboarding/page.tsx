"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { PrimaryButton } from "@/components/primary-button"
import { CheckCircle2 } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-success to-success-dark mb-6"
        >
          <CheckCircle2 className="w-10 h-10 text-white" />
        </motion.div>

        <h1 className="text-3xl font-bold mb-4">注册成功！</h1>
        <p className="text-foreground-secondary mb-8">欢迎加入 CryptoEx 交易平台</p>

        <div className="glass rounded-2xl p-6 mb-8 text-left">
          <h2 className="font-semibold mb-3 text-primary">重要提示</h2>
          <p className="text-sm text-foreground-secondary leading-relaxed">
            请联系您的推荐人指导充值与后续操作。完成首次充值后，您将获得新人专属奖励和额外跟单机会。
          </p>
        </div>

        <PrimaryButton onClick={() => router.push("/home")}>进入应用</PrimaryButton>
      </motion.div>
    </div>
  )
}
