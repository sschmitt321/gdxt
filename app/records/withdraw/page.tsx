"use client"

import { useState } from "react"
import { ArrowLeft, History } from "lucide-react"
import { useRouter } from "next/navigation"
import { PrimaryButton } from "@/components/primary-button"
import { mockUser } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function WithdrawPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [amount, setAmount] = useState("")
  const [password, setPassword] = useState("")

  const withdrawAddress = "TXhash987654321fedcba"
  const fee = Number.parseFloat(amount || "0") * 0.1
  const actualAmount = Number.parseFloat(amount || "0") - fee

  const handleWithdraw = () => {
    if (!amount || Number.parseFloat(amount) <= 0) {
      toast({ title: "请输入提币数量", variant: "destructive" })
      return
    }
    if (!password) {
      toast({ title: "请输入提现密码", variant: "destructive" })
      return
    }
    toast({ title: "提币申请已提交" })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 glass border-b border-border">
        <div className="flex items-center justify-between px-4 py-4 max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-full glass hover:bg-surface-hover active-scale"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold">提币</h1>
          </div>
          <button
            onClick={() => router.push("/records/withdraw/history")}
            className="flex items-center gap-1 text-primary active-scale"
          >
            <History className="w-5 h-5" />
            <span className="text-sm">历史</span>
          </button>
        </div>
      </div>

      <div className="p-4 max-w-lg mx-auto">
        <div className="glass rounded-2xl p-6 mb-4">
          <div className="mb-4">
            <label className="block text-sm text-foreground-secondary mb-2">币种</label>
            <div className="bg-background-secondary rounded-lg px-4 py-3">USDT</div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-foreground-secondary mb-2">提币地址</label>
            <div className="bg-background-secondary rounded-lg px-4 py-3 font-mono text-sm break-all text-foreground-muted">
              {withdrawAddress}
            </div>
            <p className="text-xs text-foreground-muted mt-1">地址不可编辑，如需修改请联系客服</p>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-foreground-secondary">提币数量</label>
              <button
                onClick={() => setAmount(mockUser.balance.toString())}
                className="text-sm text-primary active-scale"
              >
                全部
              </button>
            </div>
            <input
              type="number"
              placeholder="请输入提币数量"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-background-secondary rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-foreground-muted mt-1">可用余额: {formatCurrency(mockUser.balance)} USDT</p>
          </div>

          <div className="mb-4 p-3 rounded-lg bg-background-secondary">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-foreground-secondary">手续费 (10%)</span>
              <span className="font-medium">{formatCurrency(fee)} USDT</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground-secondary">实际到账</span>
              <span className="font-bold text-primary">{formatCurrency(actualAmount)} USDT</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-foreground-secondary mb-2">提现密码</label>
            <input
              type="password"
              placeholder="请输入提现密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background-secondary rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <PrimaryButton onClick={handleWithdraw}>提交</PrimaryButton>
        </div>

        <div className="p-4 glass rounded-xl">
          <p className="text-xs text-foreground-muted">
            提币申请提交后，将在 24 小时内审核处理。请确保地址正确，错误地址导致的损失无法找回。
          </p>
        </div>
      </div>
    </div>
  )
}
