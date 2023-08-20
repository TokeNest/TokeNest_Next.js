import CoffeeMockImg from '@/public/coffee.jpg'
import { OptionGroup, Product } from '@/variables/interface/kiosk-interface'
import { OPTION_TYPE } from '@/variables/enum/kiosk-enum'
import { TOKEN } from '@/variables/enum/web3-enum'

const mockDefaultOptions: OptionGroup[] = [
  {
    optionGroupId: '1',
    optionGroupType: OPTION_TYPE.RADIO,
    optionGroupName: '사이즈',
    defaultOptionId: '3',
    options: [
      {
        optionId: '3',
        optionName: 'Short',
        optionInfo: '237ml',
        optionPrice: 100,
        tokenOption: {
          tokenAddress: TOKEN.WDOT,
          tokenRatio: 1,
        },
      },
      {
        optionId: '4',
        optionName: 'Tall',
        optionInfo: '355ml',
        optionPrice: 500,
      },
      {
        optionId: '5',
        optionName: 'Grande',
        optionInfo: '473ml',
        optionPrice: 0,
        tokenOption: {
          tokenAddress: TOKEN.WDOT,
          tokenRatio: 100,
        },
      },
      {
        optionId: '6',
        optionName: 'Venti',
        optionInfo: '591ml',
        optionPrice: 1500,
      },
    ],
  },
  {
    optionGroupId: '7',
    optionGroupType: OPTION_TYPE.RADIO,
    optionGroupName: '온도',
    defaultOptionId: '9',
    options: [
      {
        optionId: '9',
        optionName: 'ICE',
        optionPrice: 0,
      },
      {
        optionId: '10',
        optionName: 'HOT',
        optionPrice: 500,
      },
    ],
  },
  {
    optionGroupId: '11',
    optionGroupType: OPTION_TYPE.RADIO,
    optionGroupName: '얼음',
    defaultOptionId: '12',
    options: [
      {
        optionId: '12',
        optionName: '적게',
        optionPrice: 0,
      },
      {
        optionId: '13',
        optionName: '많이',
        optionPrice: 500,
      },
    ],
  },
  {
    optionGroupId: '14',
    optionGroupType: OPTION_TYPE.RADIO,
    optionGroupName: '물',
    defaultOptionId: '15',
    options: [
      {
        optionId: '15',
        optionName: '적게',
        optionPrice: 0,
      },
      {
        optionId: '16',
        optionName: '많이',
        optionPrice: 500,
      },
    ],
  },
]
export const mockProductData: Product[] = [
  {
    productId: '11',
    productName: '아메리카노',
    productIntroduction: '쓰다 😀',
    productInfo: '추운 겨울에는 따뜻한 커피와 티를 마셔야지요.',
    productPrice: 1000,
    productImageUrl: CoffeeMockImg.src,
    optionGroups: mockDefaultOptions,
  },
  {
    productId: '12',
    productName: '에스프레소',
    productIntroduction: '맛없다 😎',
    productInfo: '추운 겨울에는 따뜻한 커피와 티를 마셔야지요.',
    productPrice: 2000,
    productImageUrl: CoffeeMockImg.src,
    optionGroups: mockDefaultOptions,
  },
  {
    productId: '13',
    productName: '카페라떼',
    productIntroduction: '맛있다 😋',
    productInfo: '추운 겨울에는 따뜻한 커피와 티를 마셔야지요.',
    productPrice: 1500,
    productImageUrl: CoffeeMockImg.src,
    optionGroups: [],
  },
  {
    productId: '14',
    productName: '콜드브루',
    productIntroduction: '멋있다 😋',
    productInfo: '추운 겨울에는 따뜻한 커피와 티를 마셔야지요.',
    productPrice: 2500,
    productImageUrl: CoffeeMockImg.src,
    optionGroups: [],
  },
  {
    productId: '15',
    productName: '레쓰비',
    productIntroduction: '으악 😋',
    productInfo: '추운 겨울에는 따뜻한 커피와 티를 마셔야지요.',
    productPrice: 1000,
    productImageUrl: CoffeeMockImg.src,
    optionGroups: [],
  },
]
