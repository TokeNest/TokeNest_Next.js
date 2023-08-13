import { MarketInfo } from '@/variables/interface/web3'
import { TOKEN } from '@/variables/enum/web3-enum'
import BigNumber from 'bignumber.js'

export const calculatePrice = (
  marketList: MarketInfo[],
  price: number,
  tokenRatio: number,
  tokenAddress: TOKEN
) => {
  const marketInfo = marketList.find(({ tokenA: { address } }) => address === tokenAddress)
  if (marketInfo) {
    const percentage = new BigNumber(tokenRatio).dividedBy(100)
    return new BigNumber(marketInfo.tokenB.price).times(percentage).plus(price).toNumber()
  } else {
    return price
  }
}
