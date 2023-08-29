import { OrderProduct } from '@/variables/interface/kiosk-interface'
import { ProductInfoClient } from '@/variables/interface/api/product-interface'

export const convertOrderProduct = ({
  id: productId,
  productOptionGroups,
}: ProductInfoClient): OrderProduct => ({
  productId,
  productQuantity: 1,
  optionGroupsInfo: productOptionGroups.map((optionGroup) => ({
    optionGroupId: optionGroup._id,
    optionIds: optionGroup.productOptions
      .filter(({ productOptionIsDefault }) => productOptionIsDefault)
      .map(({ _id: productOptionId }) => productOptionId),
  })),
})
