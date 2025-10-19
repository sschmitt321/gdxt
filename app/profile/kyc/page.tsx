"use client"

import { useState } from "react"
import { ArrowLeft, Upload, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { PrimaryButton } from "@/components/primary-button"
import { useToast } from "@/hooks/use-toast"

export default function KYCPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [idFront, setIdFront] = useState<File | null>(null)
  const [idBack, setIdBack] = useState<File | null>(null)
  const [basicComplete, setBasicComplete] = useState(false)

  const handleBasicSubmit = () => {
    if (!name) {
      toast({ title: "请输入姓名", variant: "destructive" })
      return
    }
    setBasicComplete(true)
    toast({ title: "初级认证完成" })
  }

  const handleAdvancedSubmit = () => {
    if (!idFront || !idBack) {
      toast({ title: "请上传身份证正反面", variant: "destructive" })
      return
    }
    toast({ title: "高级认证提交成功" })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 glass border-b border-border">
        <div className="flex items-center gap-3 px-4 py-4 max-w-lg mx-auto">
          <button onClick={() => router.back()} className="p-2 rounded-full glass hover:bg-surface-hover active-scale">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">身份认证</h1>
        </div>
      </div>

      <div className="p-4 max-w-lg mx-auto">
        {/* Basic KYC */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass rounded-2xl p-6 mb-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">初级认证</h3>
            {basicComplete && <CheckCircle2 className="w-5 h-5 text-success" />}
          </div>

          <div className="mb-4">
            <label className="block text-sm text-foreground-secondary mb-2">真实姓名</label>
            <input
              type="text"
              placeholder="请输入真实姓名"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={basicComplete}
              className="w-full bg-background-secondary rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
          </div>

          {!basicComplete && <PrimaryButton onClick={handleBasicSubmit}>保存</PrimaryButton>}
        </motion.div>

        {/* Advanced KYC */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="font-bold mb-4">高级认证</h3>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm text-foreground-secondary mb-2">身份证正面</label>
              <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-border rounded-xl hover:border-primary transition-colors cursor-pointer">
                {idFront ? (
                  <div className="text-center">
                    <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
                    <p className="text-sm">{idFront.name}</p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-foreground-muted mb-2" />
                    <p className="text-sm text-foreground-secondary">点击上传</p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setIdFront(e.target.files?.[0] || null)}
                />
              </label>
            </div>

            <div>
              <label className="block text-sm text-foreground-secondary mb-2">身份证反面</label>
              <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-border rounded-xl hover:border-primary transition-colors cursor-pointer">
                {idBack ? (
                  <div className="text-center">
                    <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
                    <p className="text-sm">{idBack.name}</p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-foreground-muted mb-2" />
                    <p className="text-sm text-foreground-secondary">点击上传</p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setIdBack(e.target.files?.[0] || null)}
                />
              </label>
            </div>
          </div>

          <PrimaryButton onClick={handleAdvancedSubmit}>提交认证</PrimaryButton>
        </motion.div>
      </div>
    </div>
  )
}
