
import { AddressModel, UserModel } from '@/models'
import { NextRequest, NextResponse } from 'next/server'
import { UserRequestDto } from '@/dto/user/UserRequestDto'
import { Request } from 'next/dist/compiled/@edge-runtime/primitives'
import dbConnect from '@/lib/dbconnect'
import { parse } from 'url'
import { Address } from '@/models/common/Address'
import { DocumentType } from '@typegoose/typegoose'
import { UserResponseDto } from '@/dto/user/UserResponseDto'
import { AddressResponseDto } from '@/dto/common/AddressResponseDto'

export async function GET(request: NextRequest) {
  await dbConnect()

  const url = request.url
  const urlObj = parse(url, true)
  const userId = urlObj.query.userId

  const user = await UserModel.findById(userId).populate('addresses')

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  }

  const dto = new UserResponseDto({
    userName: user.userName,
    userPassword: user.userPassword,
    userPhone: user.userPhone,
    userEmail: user.userEmail,
    userWalletAddress: user.userWalletAddress,
    userAccountType: user.userAccountType,
    addresses: user.addresses.map(address => {
      return new AddressResponseDto(address.addressName, address.roadAddress, address.addressDetail)
    })
  })


  // const dto = new UserResponseDto({
  //   ...user,
  //   addresses: user.addresses.map(address => {
  //     return new AddressResponseDto(address.addressName, address.roadAddress, address.addressDetail)
  //   })
  // })



  return NextResponse.json(dto)
}

export async function POST(request: Request) {
  await dbConnect()

  const userDto = new UserRequestDto(await request.json())
  const userData = new UserModel(userDto)
  await userData.save()

  const addressDtos = userDto.addresses
  /*
    새로 생성할 때 address PK가 계속 똑같아서 오류 발생중. => default: nanoid()라 그런거였고 ;;
   */
  for (const addressDto of addressDtos) {
    const addressData = new AddressModel({ ...addressDto, user: userData })
    await addressData.save()
    // userData.addresses.push(addressData)
  }

  return NextResponse.json(userData)
}

