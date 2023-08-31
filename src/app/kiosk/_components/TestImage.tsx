'use client'
import Image from 'next/image'
import * as React from 'react'

export default function TestImage() {
  return (
    <Image
      width={300}
      height={300}
      src="/coffee.jpg"
      alt={''}
      sizes="(max-width: 200px) 100vw"
      style={{ objectFit: 'cover' }}
    />
  )
}
