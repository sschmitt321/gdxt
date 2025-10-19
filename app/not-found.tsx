import Link from "next/link"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
      <p className="text-foreground-secondary mb-8">页面未找到</p>
      <Link
        href="/home"
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-background font-semibold active-scale"
      >
        <Home className="w-5 h-5" />
        返回首页
      </Link>
    </div>
  )
}
