import { MarketInfo } from '@/variables/interface/web3-interface'
import BigNumber from 'bignumber.js'
import { OPTION_TYPE } from '@/variables/enum/kiosk-enum'
import { OrderProductOptionGroup, TokenOption } from '@/variables/interface/kiosk-interface'
import { ProductOptionGroupInfoClient } from '@/variables/interface/api/product-option-group'

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

export const getCurrentPrice = (
  optionGroups: ProductOptionGroupInfoClient[],
  marketList: MarketInfo[]
) =>
  optionGroups.reduce((pre, optionGroup) => {
    const { productOptionGroupType, productOptions } = optionGroup
    switch (productOptionGroupType) {
      case OPTION_TYPE.RADIO: {
        const option = productOptions.find(({ productOptionIsDefault }) => productOptionIsDefault)
        return option
          ? pre +
              setCalculateOptionPrice(
                marketList,
                option.productOptionPrice,
                option.productOptionTokenOption
              )
          : pre
      }
      case OPTION_TYPE.CHECKBOX:
        return (
          pre +
          productOptions
            .filter(({ productOptionIsDefault }) => productOptionIsDefault)
            .reduce(
              (optionTotal, { productOptionPrice, productOptionTokenOption }) =>
                optionTotal +
                setCalculateOptionPrice(marketList, productOptionPrice, productOptionTokenOption),
              0
            )
        )
    }
    return pre
  }, 0)

export const calculateTotalPrice = (
  productPrice: number,
  optionGroupsInfo: OrderProductOptionGroup[],
  optionGroups: ProductOptionGroupInfoClient[],
  marketList: MarketInfo[]
) => {
  const optionIds = optionGroupsInfo.flatMap(({ optionIds }) => optionIds)
  return optionGroups
    .flatMap(({ productOptions }) => productOptions)
    .filter(({ id }) => optionIds.includes(id))
    .reduce(
      (pre, { productOptionPrice, productOptionTokenOption }) =>
        pre + getOptionMarketPrice(productOptionPrice, productOptionTokenOption, marketList),
      productPrice
    )
}
