import { MarketInfo } from '@/variables/interface/web3-interface'
import BigNumber from 'bignumber.js'
import { OPTION_TYPE } from '@/variables/enum/kiosk-enum'
import {
  OptionGroup,
  OrderProductOptionGroup,
  TokenOption,
} from '@/variables/interface/kiosk-interface'

export const getOptionMarketPrice = (
  optionPrice: number,
  tokenOption: TokenOption | undefined,
  marketList: MarketInfo[]
) => {
  if (tokenOption) {
    const { tokenAddress, tokenRatio } = tokenOption
    const marketInfo = marketList.find(({ tokenA: { address } }) => address === tokenAddress)
    if (marketInfo) {
      const percentage = new BigNumber(tokenRatio).dividedBy(100)
      return new BigNumber(marketInfo.tokenA.price).times(percentage).plus(optionPrice).toNumber()
    }
  }
  return optionPrice
}
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
      return new BigNumber(marketInfo.tokenA.price).times(percentage).plus(optionPrice).toNumber()
    }
  }
  return optionPrice
}

export const getCurrentPrice = (optionGroups: OptionGroup[], marketList: MarketInfo[]) =>
  optionGroups.reduce((pre, optionGroup) => {
    const { optionGroupType, options } = optionGroup
    switch (optionGroupType) {
      case OPTION_TYPE.RADIO: {
        const option = options.find(({ optionId }) => optionId === optionGroup.defaultOptionId)
        return option
          ? pre + setCalculateOptionPrice(marketList, option.optionPrice, option.tokenOption)
          : pre
      }
      case OPTION_TYPE.CHECKBOX:
        return (
          pre +
          options
            .filter(({ optionId }) => optionGroup.defaultOptionIds.includes(optionId))
            .reduce(
              (optionTotal, { optionPrice, tokenOption }) =>
                optionTotal + setCalculateOptionPrice(marketList, optionPrice, tokenOption),
              0
            )
        )
    }
  }, 0)

export const calculateTotalPrice = (
  productPrice: number,
  optionGroupsInfo: OrderProductOptionGroup[],
  optionGroups: OptionGroup[],
  marketList: MarketInfo[]
) => {
  const optionIds = optionGroupsInfo.flatMap(({ optionIds }) => optionIds)
  return optionGroups
    .flatMap(({ options }) => options)
    .filter(({ optionId }) => optionIds.includes(optionId))
    .reduce(
      (pre, { optionPrice, tokenOption }) =>
        pre + getOptionMarketPrice(optionPrice, tokenOption, marketList),
      productPrice
    )
}
