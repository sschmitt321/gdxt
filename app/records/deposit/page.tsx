"use client"

import { ArrowLeft, Copy, History } from "lucide-react"
import { useRouter } from "next/navigation"
import { QRCodeSVG } from "qrcode.react"
import { useToast } from "@/hooks/use-toast"

export default function DepositPage() {
  const router = useRouter()
  const { toast } = useToast()
  const depositAddress = "TXhash123456789abcdefghijklmnop"

  const handleCopy = () => {
    navigator.clipboard.writeText(depositAddress)
    toast({ title: "地址已复制" })
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
            <h1 className="text-lg font-bold">充币</h1>
          </div>
          <button
            onClick={() => router.push("/records/deposit/history")}
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

          <div className="mb-6">
            <label className="block text-sm text-foreground-secondary mb-2">链名称</label>
            <div className="bg-background-secondary rounded-lg px-4 py-3">TRC20</div>
          </div>

          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white rounded-2xl">
              <QRCodeSVG value={depositAddress} size={200} />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-foreground-secondary mb-2">充值地址</label>
            <div className="flex gap-2">
              <div className="flex-1 bg-background-secondary rounded-lg px-4 py-3 font-mono text-sm break-all">
                {depositAddress}
              </div>
              <button onClick={handleCopy} className="px-4 glass rounded-lg hover:bg-surface-hover active-scale">
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 glass rounded-xl">
          <p className="text-sm text-danger font-medium mb-2">⚠️ 重要提示</p>
          <ul className="text-xs text-foreground-secondary space-y-1">
            <li>• 请选择正确的链与币种，否则资产将无法找回</li>
            <li>• 最小充值金额: 10 USDT</li>
            <li>• 到账时间: 网络确认后约 5-10 分钟</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
