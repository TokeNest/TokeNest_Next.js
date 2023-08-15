import dbConnect from '@/lib/dbconnect'
import { UserModel } from '@/models'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  await dbConnect()
  const users = await UserModel.find({}).limit(10).lean()
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  await dbConnect()
  var user = new UserModel({
    name: '최형택',
  })
  await user.save()

  return NextResponse.json(user.toJSON())
}
