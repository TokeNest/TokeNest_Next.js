import { MarketInfo } from '@/variables/interface/web3-interface'
import BigNumber from 'bignumber.js'
import { OPTION_TYPE } from '@/variables/enum/kiosk-enum'
import { OptionGroup, Product, TokenOption } from '@/variables/interface/kiosk-interface'
import { OptionState } from '@/redux/slice/order-info-slice'

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

export const setCalculateTotalPrice = (
  optionsState: OptionState[],
  productPrice: number,
  productQuantity: number
) => optionsState.reduce((pre, { totalPrice }) => pre + totalPrice, productPrice) * productQuantity

export const setProductCardPrice = (optionGroups: OptionGroup[], marketList: MarketInfo[]) =>
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
