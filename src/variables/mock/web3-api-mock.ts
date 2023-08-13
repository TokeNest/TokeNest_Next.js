import { MarketInfo } from '@/variables/interface/web3'
import { MARKET, TOKEN } from '@/variables/enum/web3-enum'

export const mockDefaultMarketList: MarketInfo[] = [
  {
    market: MARKET.WDOT_USDT_PAIR,
    tokenA: {
      address: TOKEN.WDOT,
      decimal: 6,
      price: '0',
    },
    tokenB: {
      address: TOKEN.USDT,
      decimal: 6,
      price: '0',
    },
  },
]
