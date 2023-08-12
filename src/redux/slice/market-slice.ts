import { createSlice } from '@reduxjs/toolkit'
import { MarketInfo } from '@/variables/interface/web3'

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
    setMarketPrice: (state) => {
      // const targetMarket = state.marketList.find(
      //   ({ marketContract }) => marketContract === payload.market
      // )
      // if (targetMarket) {
      //   targetMarket.tokenA.amount = payload.reserve0
      //   targetMarket.tokenB.amount = payload.reserve1
      // }
    },
  },
})
export const { setMarketList, setMarketPrice } = market.actions
export default market.reducer
