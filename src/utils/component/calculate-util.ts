import { MarketInfo } from '@/variables/interface/web3-interface'
import BigNumber from 'bignumber.js'
import { OPTION_TYPE } from '@/variables/enum/kiosk-enum'
import { OrderProductOptionGroup } from '@/variables/interface/kiosk-interface'
import { ProductOptionGroupInfoClient } from '@/variables/interface/api/product-option-group-interface'
import { TokenInfo } from '@/variables/interface/api/token-interface'

export const setCalculateOptionPrice = (
  marketList: MarketInfo[],
  optionPrice: number,
  tokenOption: TokenInfo | null,
  tokenRatio: number | null
) => {
  if (tokenOption) {
    const { tokenAddress } = tokenOption
    const marketInfo = marketList.find(({ tokenA: { address } }) => address === tokenAddress)
    if (marketInfo && tokenRatio !== null) {
      const percentage = new BigNumber(tokenRatio).dividedBy(100)
      return new BigNumber(marketInfo.tokenA.price).times(percentage).plus(optionPrice).toNumber()
    }
  }
  return optionPrice
}

export const getCurrentPrice = (
  optionGroups: ProductOptionGroupInfoClient[],
  marketList: MarketInfo[],
  productPrice: number
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
                option.token,
                option.tokenRatio
              )
          : pre
      }
      case OPTION_TYPE.CHECKBOX:
        return (
          pre +
          productOptions
            .filter(({ productOptionIsDefault }) => productOptionIsDefault)
            .reduce(
              (optionTotal, { productOptionPrice, token, tokenRatio }) =>
                optionTotal +
                setCalculateOptionPrice(marketList, productOptionPrice, token, tokenRatio),
              0
            )
        )
    }
    return pre
  }, productPrice)

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
      (pre, { productOptionPrice, token, tokenRatio }) =>
        pre + setCalculateOptionPrice(marketList, productOptionPrice, token, tokenRatio),
      productPrice
    )
}
