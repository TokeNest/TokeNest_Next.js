import { createSlice } from '@reduxjs/toolkit'
import { MARKET, TOKEN } from '@/web3/contractList'

interface TokenInfo {
  address: TOKEN
  decimal: number
  amount: string
}
interface MarketInfo {
  market: MARKET
  tokenA: TokenInfo
  tokenB: TokenInfo
}
const initialState = {
  value: {
    marketList: [
      {
        market: MARKET.WDOT_USDT_PAIR,
        tokenA: {
          address: TOKEN.WDOT,
          decimal: 18,
          amount: '0',
        },
        tokenB: {
          address: TOKEN.USDT,
          decimal: 18,
          amount: '0',
        },
      },
    ] as MarketInfo[],
  },
}
export const market = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setMarketPrice: (state, { payload }) => {
      const targetMarket = state.value.marketList.find(({ market }) => market === payload.market)
      if (targetMarket) {
        targetMarket.tokenA.amount = payload.reserve0
        targetMarket.tokenB.amount = payload.reserve1
      }
    },
  },
})
export const { setMarketPrice } = market.actions
export default market.reducer
