import { MarketInfo } from '@/variables/interface/web3'
import { MARKET, TOKEN } from '@/web3/contractList'

export const mockDefaultMarketList: MarketInfo[] = [
  {
    market: MARKET.WDOT_USDT_PAIR,
    tokenA: {
      address: TOKEN.WDOT,
      decimal: 6,
    },
    tokenB: {
      address: TOKEN.USDT,
      decimal: 6,
    },
  },
]
