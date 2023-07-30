import CoffeeMockImg from '@/public/mock/coffee.jpg'

export interface Item {
  heading: string
  text: string
  image: string
}

export const getItemList: Promise<Item[]> = new Promise((resolve) =>
  setTimeout(
    () =>
      resolve([
        { heading: '아메리카노', text: '쓰다 😀', image: CoffeeMockImg.src },
        { heading: '에스프레소', text: '엄청 쓰다 😎', image: CoffeeMockImg.src },
        { heading: '카페라떼', text: '맛있다 😋', image: CoffeeMockImg.src },
        { heading: '콜드브루', text: '멋있다 😋', image: CoffeeMockImg.src },
        { heading: '레쓰비', text: '으악 😋', image: CoffeeMockImg.src },
      ]),
    1000
  )
)
