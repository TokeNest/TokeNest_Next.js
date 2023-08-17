import dbConnect from '@/lib/dbconnect'
import { StoreModel } from '@/models'
import { NextResponse } from 'next/server'
import { StoreRequestDto } from '@/app/_helpers/server/dto/store/StoreRequestDto'

export async function GET(request: Request) {
  await dbConnect()
  const stores = await StoreModel.find({}).limit(10).lean()
  return NextResponse.json(stores)
}

export async function POST(request: Request) {
  await dbConnect()
  const req: StoreRequestDto = await request.json()
  // const store = req.toModel()
  const store = new StoreModel({
    store_name: req.store_name,
    store_tel: req.store_tel,
    store_email: req.store_email,
    store_category: req.store_category,
    store_off_day: req.store_off_day,
    store_open_and_close_time: req.store_open_and_close_time,
    store_status: req.store_status,
  })
  await store.save()
  return NextResponse.json(store.toJSON())
}
