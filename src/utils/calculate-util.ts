import { MarketInfo } from '@/variables/interface/web3'
import BigNumber from 'bignumber.js'
import { OPTION_TYPE } from '@/variables/enum/kiosk-enum'
import { Product, TokenOption } from '@/variables/interface/kiosk'

export const setCalculateOptionPrice = (
  marketList: MarketInfo[],
  optionPrice: number,
  tokenOption: TokenOption | undefined
) => {
  if (tokenOption) {
    const { tokenAddress, tokenRatio } = tokenOption
    const marketInfo = marketList.find(({ tokenA: { address } }) => address === tokenAddress)
    if (marketInfo) {
      const percentage = new BigNumber(tokenRatio).dividedBy(100)
      return new BigNumber(marketInfo.tokenB.price).times(percentage).plus(optionPrice).toNumber()
    } else {
      return optionPrice
    }
  } else {
    return optionPrice
  }
}

export const setDefaultOptionsPrice = (product: Product) =>
  product.optionGroups.map((optionGroup) => {
    const { optionGroupType, optionGroupId, options } = optionGroup
    switch (optionGroupType) {
      case OPTION_TYPE.RADIO:
        const { defaultOptionId } = optionGroup
        return {
          optionGroupId,
          totalPrice:
            options.find(({ optionId }) => optionId === defaultOptionId)?.optionPrice ?? 0,
        }
      case OPTION_TYPE.CHECKBOX:
        const { defaultOptionIds } = optionGroup
        return {
          optionGroupId,
          totalPrice: options
            .filter(({ optionId }) => defaultOptionIds.includes(optionId))
            .reduce((pre, { optionPrice }) => pre + optionPrice, 0),
        }
    }
  })
