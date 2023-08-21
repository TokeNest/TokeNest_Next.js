import { OrderProduct, Product } from '@/variables/interface/kiosk-interface'
import { OPTION_TYPE } from '@/variables/enum/kiosk-enum'

export const convertOrderProduct = ({ productId, optionGroups }: Product): OrderProduct => ({
  productId,
  productQuantity: 1,
  optionGroupsInfo: optionGroups.map((optionGroup) => {
    switch (optionGroup.optionGroupType) {
      case OPTION_TYPE.RADIO:
        return {
          optionGroupId: optionGroup.optionGroupId,
          optionIds: [optionGroup.defaultOptionId],
        }
      case OPTION_TYPE.CHECKBOX:
        return { optionGroupId: optionGroup.optionGroupId, optionIds: optionGroup.defaultOptionIds }
    }
  }),
})
