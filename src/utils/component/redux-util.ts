import { OrderProduct, Product } from '@/variables/interface/kiosk-interface'

export const convertOrderProduct = ({ productId, optionGroups }: Product): OrderProduct => ({
  productId,
  productQuantity: 1,
  optionGroupsInfo: optionGroups.map((optionGroup) => ({
    optionGroupId: optionGroup.optionGroupId,
    optionIds: optionGroup.options
      .filter(({ isDefault }) => isDefault)
      .map(({ optionId }) => optionId),
  })),
})
