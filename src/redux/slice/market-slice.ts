import { createSlice } from '@reduxjs/toolkit'
import { MarketInfo } from '@/variables/interface/web3-interface'

const initialState = {
  value: {
    marketList: [] as MarketInfo[],
  },
}
export const market = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setMarketList: (_, { payload: marketList }: { payload: MarketInfo[] }) => ({
      value: {
        marketList,
      },
    }),
    setMarketPrice: (state, { payload }) => {
      const targetMarket = state.value.marketList.find(({ market }) => market === payload.market)
      if (targetMarket) {
        targetMarket.tokenA.price = payload.token0Value
        targetMarket.tokenB.price = payload.token1Value
      }
    },
  },
})
export const { setMarketList, setMarketPrice } = market.actions
export default market.reducer
