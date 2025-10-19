"use client"

import { useState } from "react"
import { ArrowLeft, Copy } from "lucide-react"
import { useRouter } from "next/navigation"
import { PrimaryButton } from "@/components/primary-button"
import { useToast } from "@/hooks/use-toast"

export default function WithdrawAddressPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [address, setAddress] = useState("")
  const [isSet, setIsSet] = useState(false)

  const handleSave = () => {
    if (!address) {
      toast({ title: "请输入钱包地址", variant: "destructive" })
      return
    }
    setIsSet(true)
    toast({ title: "提现地址已保存" })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(address)
    toast({ title: "地址已复制" })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 glass border-b border-border">
        <div className="flex items-center gap-3 px-4 py-4 max-w-lg mx-auto">
          <button onClick={() => router.back()} className="p-2 rounded-full glass hover:bg-surface-hover active-scale">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">绑定提现地址</h1>
        </div>
      </div>

      <div className="p-4 max-w-lg mx-auto">
        <div className="glass rounded-2xl p-6">
          <div className="mb-4">
            <label className="block text-sm text-foreground-secondary mb-2">币种</label>
            <div className="bg-background-secondary rounded-lg px-4 py-3 text-foreground-muted">USDT (仅支持)</div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-foreground-secondary mb-2">链类型</label>
            <div className="bg-background-secondary rounded-lg px-4 py-3 text-foreground-muted">TRC20 (仅支持)</div>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-foreground-secondary mb-2">钱包地址</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="请输入 TRC20 钱包地址"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={isSet}
                className="flex-1 bg-background-secondary rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
              {isSet && (
                <button onClick={handleCopy} className="px-4 glass rounded-lg hover:bg-surface-hover active-scale">
                  <Copy className="w-5 h-5" />
                </button>
              )}
            </div>
            {isSet && <p className="text-xs text-danger mt-2">⚠️ 地址已设置，不可修改</p>}
          </div>

          {!isSet && <PrimaryButton onClick={handleSave}>保存地址</PrimaryButton>}
        </div>

        <div className="mt-4 p-4 glass rounded-xl">
          <p className="text-xs text-foreground-muted">
            ⚠️ 请务必确认地址正确，设置后不可修改。错误地址可能导致资产损失。
          </p>
        </div>
      </div>
    </div>
  )
}
