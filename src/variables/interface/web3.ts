import { MARKET, TOKEN } from '@/web3/contractList'

/**
 * 토큰에 관한 정보.
 * */
export interface TokenInfo {
  address: TOKEN
  decimal: number
  price: string
}

/**
 * 마켓에 관한 정보.
 * */
export interface MarketInfo {
  market: MARKET
  tokenA: TokenInfo
  tokenB: TokenInfo
}
