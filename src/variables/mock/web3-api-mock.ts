import { MarketInfo } from '@/variables/interface/web3-interface'
import { MARKET, TOKEN } from '@/variables/enum/web3-enum'

export const mockDefaultMarketList: MarketInfo[] = [
  {
    market: MARKET.WDOT_USDT_PAIR,
    tokenA: {
      address: TOKEN.WDOT,
      decimal: 18,
      price: '0',
    },
    tokenB: {
      address: TOKEN.USDT,
      decimal: 18,
      price: '0',
    },
  },
  {
    market: MARKET.WDOT2_USDT_PAIR,
    tokenA: {
      address: TOKEN.WDOT2,
      decimal: 18,
      price: '0',
    },
    tokenB: {
      address: TOKEN.USDT,
      decimal: 18,
      price: '0',
    },
  },
  {
    market: MARKET.WDOT3_USDT_PAIR,
    tokenA: {
      address: TOKEN.WDOT3,
      decimal: 18,
      price: '0',
    },
    tokenB: {
      address: TOKEN.USDT,
      decimal: 18,
      price: '0',
    },
  },
]
