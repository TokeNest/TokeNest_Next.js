import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbconnect'
import { ProductModel } from '@/models'
import { ProductRequestDto } from '@/dto/product/ProductRequestDto'

export async function GET(request: Request) {
  await dbConnect()
  const products = ProductModel.find({}).limit(10).lean()
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  await dbConnect()
  const req: ProductRequestDto = await request.json()

  return NextResponse.json({ message: '200 : ww' })
}
