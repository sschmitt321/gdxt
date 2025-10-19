import type { CoinPrice, ReferralLevel, TradeOrder, Transaction, User } from "./types"

export const mockUser: User = {
  id: "USER001",
  email: "user@example.com",
  balance: 12580.5,
  spotBalance: 8500.3,
  contractBalance: 4080.2,
  level: 1,
  referralCode: "REF123456",
  referralLink: "https://app.example.com/register?ref=REF123456",
  teamCount: 3,
  totalEarnings: 1250.8,
  dailyTradeCount: 2,
  bonusTradeCount: 0,
  isNewUser: true,
  joinDate: new Date("2025-01-10"),
  kycLevel: "none",
  hasWithdrawn: false,
}

export const mockCoins: CoinPrice[] = [
  { symbol: "BTC/USDT", name: "Bitcoin", price: 94235.8, change24h: 2.45, logo: "₿" },
  { symbol: "ETH/USDT", name: "Ethereum", price: 3456.2, change24h: -1.23, logo: "Ξ" },
  { symbol: "XRP/USDT", name: "Ripple", price: 0.6234, change24h: 5.67, logo: "X" },
  { symbol: "LINK/USDT", name: "Chainlink", price: 18.45, change24h: 3.21, logo: "L" },
  { symbol: "DOT/USDT", name: "Polkadot", price: 7.89, change24h: -2.34, logo: "D" },
  { symbol: "DOGE/USDT", name: "Dogecoin", price: 0.0823, change24h: 8.9, logo: "Ð" },
  { symbol: "DASH/USDT", name: "Dash", price: 34.56, change24h: 1.45, logo: "D" },
  { symbol: "BCH/USDT", name: "Bitcoin Cash", price: 456.78, change24h: -0.89, logo: "B" },
  { symbol: "LTC/USDT", name: "Litecoin", price: 89.34, change24h: 2.1, logo: "Ł" },
  { symbol: "SOL/USDT", name: "Solana", price: 145.67, change24h: 4.56, logo: "S" },
  { symbol: "PEPE/USDT", name: "Pepe", price: 0.000012, change24h: 12.34, logo: "P" },
]

export const referralLevels: ReferralLevel[] = [
  { level: 1, name: "1级代言人", directReferrals: 3, teamSize: 0, oneTimeReward: 50, dividendRate: 0.5 },
  { level: 2, name: "2级代言人", directReferrals: 5, teamSize: 20, oneTimeReward: 200, dividendRate: 1.0 },
  { level: 3, name: "3级代言人", directReferrals: 8, teamSize: 50, oneTimeReward: 500, dividendRate: 1.5 },
  { level: 4, name: "4级代言人", directReferrals: 15, teamSize: 200, oneTimeReward: 1500, dividendRate: 2.0 },
  { level: 5, name: "5级代言人", directReferrals: 20, teamSize: 500, oneTimeReward: 3000, dividendRate: 2.5 },
]

export const mockTradeOrders: TradeOrder[] = [
  {
    id: "ORDER001",
    symbol: "BTC/USDT",
    amount: 125.8,
    tradeCode: "TC20250116130001",
    status: "active",
    createdAt: new Date("2025-01-16T13:00:00"),
    expiresAt: new Date("2025-01-16T14:00:00"),
  },
  {
    id: "ORDER002",
    symbol: "ETH/USDT",
    amount: 125.8,
    tradeCode: "TC20250115200001",
    status: "settled",
    profit: 69.19,
    createdAt: new Date("2025-01-15T20:00:00"),
    expiresAt: new Date("2025-01-15T21:00:00"),
    settledAt: new Date("2025-01-15T21:00:00"),
  },
]

export const mockTransactions: Transaction[] = [
  {
    id: "TXN001",
    type: "deposit",
    amount: 1000,
    currency: "USDT",
    status: "completed",
    address: "TXhash123456789abcdef",
    createdAt: new Date("2025-01-15T10:30:00"),
  },
  {
    id: "TXN002",
    type: "withdraw",
    amount: 500,
    currency: "USDT",
    status: "pending",
    fee: 50,
    address: "TXhash987654321fedcba",
    createdAt: new Date("2025-01-16T09:15:00"),
  },
]

// Simulate price updates
export function updateCoinPrices(coins: CoinPrice[]): CoinPrice[] {
  return coins.map((coin) => ({
    ...coin,
    price: coin.price * (1 + (Math.random() - 0.5) * 0.002),
    change24h: coin.change24h + (Math.random() - 0.5) * 0.1,
  }))
}
