import { createSlice } from '@reduxjs/toolkit'
import { MarketInfo, MarketPrice } from '@/variables/interface/web3-interface'

const initialState = {
  marketList: [] as MarketInfo[],
}
export const market = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setMarketList: (_, { payload: marketList }: { payload: MarketInfo[] }) => ({
      marketList,
    }),
    updateMarketPrice: (state, { payload }: { payload: MarketPrice[] }) => {
      payload.forEach(({ market, tokenA, tokenB }) => {
        const index = state.marketList.findIndex((res) => res.market === market)
        if (index !== -1) {
          state.marketList[index].tokenA.price = tokenA
          state.marketList[index].tokenB.price = tokenB
        }
      })
    },
  },
})
export const { setMarketList, updateMarketPrice } = market.actions
export default market.reducer
