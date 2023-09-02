'use client'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { getCurrentPrice } from '@/utils/component/calculate-util'
import { AppDispatch, useAppSelector } from '@/redux/store'
import CardActionArea from '@mui/material/CardActionArea'
import { useDrawerContext } from '@/app/kiosk/drawer-provider'
import { useDispatch } from 'react-redux'
import { convertOrderProduct } from '@/utils/component/redux-util'
import { setOrderProduct } from '@/redux/slice/order-product-slice'
import { useRouter } from 'next/navigation'
import { ProductInfoClient } from '@/variables/interface/api/product-interface'
import PriceNumberFormat from '@/components/input/PriceNumberFormat'
import Typography from '@mui/material/Typography'
import { Transition } from 'react-transition-group'
import ArrowDropUpSharpIcon from '@mui/icons-material/ArrowDropUpSharp'
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp'
import { ProductOptionGroupInfoClient } from '@/variables/interface/api/product-option-group-interface'

export function ProductCardActionArea({
  children,
  product,
}: {
  children: React.ReactNode
  product: ProductInfoClient
}) {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { setDrawerIsOpen } = useDrawerContext()
  const clickEvent = () => {
    dispatch(setOrderProduct(convertOrderProduct(product)))
    router.push(`kiosk/order/${product.id}`)
    setDrawerIsOpen(true)
  }
  return (
    <CardActionArea
      sx={{ height: 1, width: 1 }}
      onClick={clickEvent}
      onDragStart={(e) => e.preventDefault()}
    >
      {children}
    </CardActionArea>
  )
}

export function ProductCardPrice({
  productPrice,
  productOptionGroups,
}: {
  productPrice: number
  productOptionGroups: ProductOptionGroupInfoClient[]
}) {
  const marketList = useAppSelector(({ marketReducer }) => marketReducer.marketList)
  const currentPrice = getCurrentPrice(productOptionGroups, marketList, productPrice)
  const [onChanged, setOnChanged] = useState(false)
  const [color, setColor] = useState('black')
  const [prevPrice, setPrevPrice] = useState(currentPrice)
  const [increase, setIsIncrease] = useState(false)
  useEffect(() => {
    setPrevPrice((prev) => {
      setIsIncrease(currentPrice > prev)
      setOnChanged((change) => !change)
      return currentPrice
    })
  }, [currentPrice])
  return (
    <Transition
      in={onChanged}
      appear
      timeout={{
        enter: 1500,
        exit: 1500,
      }}
      onEnter={() => setColor(increase ? 'green' : 'red')}
      onEntered={() => setColor('black')}
      onExit={() => setColor(increase ? 'green' : 'red')}
      onExited={() => setColor('black')}
    >
      {(_) => (
        <>
          <Typography
            color={color}
            sx={{ textAlign: 'right', height: 28, display: 'flex', justifyContent: 'right' }}
          >
            {color === 'green' && <ArrowDropUpSharpIcon />}
            {color === 'red' && <ArrowDropDownSharpIcon />}
            <PriceNumberFormat price={currentPrice} />
          </Typography>
        </>
      )}
    </Transition>
  )
}
