import { MARKET, TOKEN } from '@/web3/contractList'

export interface TokenInfo {
  address: TOKEN
  decimal: number
  price: string
}
export interface MarketInfo {
  market: MARKET
  tokenA: TokenInfo
  tokenB: TokenInfo
}
