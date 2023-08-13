import CoffeeMockImg from '@/public/coffee.jpg'
import { Category, Product } from '@/variables/interface/kiosk'
import { TOKEN } from '@/web3/contractList'

const mockDefaultOptions = [
  {
    optionName: '사이즈',
    defaultValue: 0,
    optionInfo: [
      {
        label: 'SHORT',
        value: 0,
      },
      {
        label: 'TALL',
        value: 1,
      },
      {
        label: 'GRANDE',
        value: 2,
      },
      {
        label: 'VENTI',
        value: 3,
      },
    ],
  },
  {
    optionName: '온도',
    defaultValue: 0,
    optionInfo: [
      {
        label: 'HOT',
        value: 0,
      },
      {
        label: 'ICE',
        value: 1,
      },
    ],
  },
  {
    optionName: '얼음',
    defaultValue: 0,
    optionInfo: [
      {
        label: '선택 안 함',
        value: 0,
      },
      {
        label: '얼음 적게',
        value: 1,
      },
      {
        label: '얼음 보통',
        value: 2,
      },
      {
        label: '얼음 많이',
        value: 3,
      },
    ],
  },
  {
    optionName: '샷 추가',
    defaultValue: 0,
    optionInfo: [
      {
        label: '선택 안 함',
        value: 0,
      },
      {
        label: '1 샷 추가',
        value: 1,
      },
      {
        label: '2 샷 추가',
        value: 2,
      },
      {
        label: '3 샷 추가',
        value: 3,
      },
    ],
  },
]
export const mockProductData: Product[] = [
  {
    tokenAddress: TOKEN.WDOT,
    tokenRatio: 1,
    name: '아메리카노',
    info: '쓰다 😀',
    description: '추운 겨울에는 따뜻한 커피와 티를 마셔야지요.',
    imageUrl: CoffeeMockImg.src,
    price: 1000,
    options: mockDefaultOptions,
  },
  {
    tokenAddress: TOKEN.WDOT,
    tokenRatio: 1,
    name: '에스프레소',
    info: '맛없다 😎',
    description: '추운 겨울에는 따뜻한 커피와 티를 마셔야지요.',
    imageUrl: CoffeeMockImg.src,
    price: 2000,
    options: [],
  },
  {
    tokenAddress: TOKEN.WDOT,
    tokenRatio: 1,
    name: '카페라떼',
    info: '맛있다 😋',
    description: '추운 겨울에는 따뜻한 커피와 티를 마셔야지요.',
    imageUrl: CoffeeMockImg.src,
    price: 1500,
    options: [],
  },
  {
    tokenAddress: TOKEN.WDOT,
    tokenRatio: 1,
    name: '콜드브루',
    info: '멋있다 😋',
    description: '추운 겨울에는 따뜻한 커피와 티를 마셔야지요.',
    imageUrl: CoffeeMockImg.src,
    price: 2500,
    options: [],
  },
  {
    tokenAddress: TOKEN.WDOT,
    tokenRatio: 1,
    name: '레쓰비',
    info: '으악 😋',
    description: '추운 겨울에는 따뜻한 커피와 티를 마셔야지요.',
    imageUrl: CoffeeMockImg.src,
    price: 1000,
    options: [],
  },
]
export const getCategoryProductList: Promise<Category[]> = new Promise((resolve) =>
  setTimeout(() => resolve([{ index: 0, name: 'coffee', data: mockProductData }]), 1000)
)
export const mockFetcher = (url: string) => getCategoryProductList.then((res) => res)
