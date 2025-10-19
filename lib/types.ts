export interface User {
  id: string
  email: string
  balance: number
  spotBalance: number
  contractBalance: number
  level: number
  referralCode: string
  referralLink: string
  referredBy?: string
  teamCount: number
  totalEarnings: number
  dailyTradeCount: number
  bonusTradeCount: number
  isNewUser: boolean
  joinDate: Date
  kycLevel: "none" | "basic" | "advanced"
  withdrawAddress?: string
  hasWithdrawn: boolean
}

export interface CoinPrice {
  symbol: string
  name: string
  price: number
  change24h: number
  logo: string
}

export interface TradeOrder {
  id: string
  symbol: string
  amount: number
  tradeCode: string
  status: "active" | "expired" | "settled"
  profit?: number
  createdAt: Date
  expiresAt: Date
  settledAt?: Date
}

export interface Transaction {
  id: string
  type: "deposit" | "withdraw" | "swap" | "transfer"
  amount: number
  currency: string
  status: "pending" | "completed" | "failed"
  fee?: number
  fromAccount?: string
  toAccount?: string
  address?: string
  createdAt: Date
}

export interface ReferralLevel {
  level: number
  name: string
  directReferrals: number
  teamSize: number
  oneTimeReward: number
  dividendRate: number
}
