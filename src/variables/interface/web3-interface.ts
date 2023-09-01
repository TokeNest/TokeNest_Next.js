import { MARKET } from '@/variables/enum/web3-enum'

/**
 * 토큰에 관한 정보.
 * */
export interface Web3TokenInfo {
  address: string
  decimal: number
  price: string
}

/**
 * 마켓에 관한 정보.
 * */
export interface MarketInfo {
  market: MARKET
  tokenA: Web3TokenInfo
  tokenB: Web3TokenInfo
}

export interface MarketPrice {
  market: MARKET
  tokenA: string
  tokenB: string
}
