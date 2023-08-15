import { AddressRequestDto } from '@/dto/common/AddressRequestDto'
import dbConnect from '@/lib/dbconnect'
import { AddressModel, UserModel } from '@/models'
import { NextResponse } from 'next/server'

export async function GET (request: Request) {
  await dbConnect()

}

export async function POST (request: Request) {
  await dbConnect()

  // Address save
  const addressDto: AddressRequestDto = new AddressRequestDto(await request.json())

  // const user = await UserModel.findById(addressDto.userId)

  if(user == null) {
    return NextResponse.json('This user not exist.')
  }

  const addressData = new AddressModel(addressDto)
  // addressData.user = user
  // user.addresses.push(addressData)
  await addressData.save()

}

