import CoffeeMockImg from '@/public/coffee.jpg'
import { OptionGroup, Product } from '@/variables/interface/kiosk-interface'
import { OPTION_TYPE } from '@/variables/enum/kiosk-enum'
import { TOKEN } from '@/variables/enum/web3-enum'

const mockDefaultOptions: OptionGroup[] = [
  {
    optionGroupId: 0,
    optionGroupType: OPTION_TYPE.RADIO,
    optionGroupName: '사이즈',
    defaultOptionId: 1,
    options: [
      {
        optionId: 0,
        optionName: 'Short',
        optionInfo: '237ml',
        optionPrice: 100,
        tokenOption: {
          tokenAddress: TOKEN.WDOT,
          tokenRatio: 100,
        },
      },
      {
        optionId: 1,
        optionName: 'Tall',
        optionInfo: '355ml',
        optionPrice: 500,
      },
      {
        optionId: 2,
        optionName: 'Grande',
        optionInfo: '473ml',
        optionPrice: 1000,
      },
      {
        optionId: 3,
        optionName: 'Venti',
        optionInfo: '591ml',
        optionPrice: 1500,
      },
    ],
  },
  {
    optionGroupId: 1,
    optionGroupType: OPTION_TYPE.RADIO,
    optionGroupName: '온도',
    defaultOptionId: 0,
    options: [
      {
        optionId: 0,
        optionName: 'ICE',
        optionPrice: 0,
      },
      {
        optionId: 1,
        optionName: 'HOT',
        optionPrice: 500,
      },
    ],
  },
]
export const mockProductData: Product[] = [
  {
    productId: 0,
    productName: '아메리카노',
    productIntroduction: '쓰다 😀',
    productInfo: '추운 겨울에는 따뜻한 커피와 티를 마셔야지요.',
    productPrice: 1000,
    productImageUrl: CoffeeMockImg.src,
    optionGroups: mockDefaultOptions,
  },
  {
    productId: 1,
    productName: '에스프레소',
    productIntroduction: '맛없다 😎',
    productInfo: '추운 겨울에는 따뜻한 커피와 티를 마셔야지요.',
    productPrice: 2000,
    productImageUrl: CoffeeMockImg.src,
    optionGroups: mockDefaultOptions,
  },
  {
    productId: 2,
    productName: '카페라떼',
    productIntroduction: '맛있다 😋',
    productInfo: '추운 겨울에는 따뜻한 커피와 티를 마셔야지요.',
    productPrice: 1500,
    productImageUrl: CoffeeMockImg.src,
    optionGroups: [],
  },
  {
    productId: 3,
    productName: '콜드브루',
    productIntroduction: '멋있다 😋',
    productInfo: '추운 겨울에는 따뜻한 커피와 티를 마셔야지요.',
    productPrice: 2500,
    productImageUrl: CoffeeMockImg.src,
    optionGroups: [],
  },
  {
    productId: 4,
    productName: '레쓰비',
    productIntroduction: '으악 😋',
    productInfo: '추운 겨울에는 따뜻한 커피와 티를 마셔야지요.',
    productPrice: 1000,
    productImageUrl: CoffeeMockImg.src,
    optionGroups: [],
  },
]
