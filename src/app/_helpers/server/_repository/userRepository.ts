import { db } from '../db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { headers } from 'next/headers'
import { userRequestDto } from '@/app/_helpers/server/dto/user/userRequestDto'

const User = db.User

export const userRepository = {
  authenticate,
  getAll,
  getById,
  getCurrent,
  create,
  update,
  softDelete: _softDelete,
  delete: _delete,
}

async function authenticate({ user_wallet_address, user_password }: {
  user_wallet_address: string;
  user_password: string
}) {
  const user = await User.findOne({ user_wallet_address })

  if (!(user && bcrypt.compareSync(user_password, user.user_password_hash))) {
    throw 'Invalid Value: UserWalletAddress or password is incorrect'
  }

  // create jwt token that is valid for7 days
  const token = jwt.sign({ sub: user.user_wallet_address }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  })

  return {
    token,
  }
}

async function getAll() {
  const users = await User.find().populate('addresses')
  let result: userRequestDto[] = []
  for (const user of users) {
    const userDto = new userRequestDto({
      userName: user.user_name,
      userPasswordHash: user.user_password_hash,
      userPhone: user.user_phone,
      userEmail: user.user_email,
      userWalletAddress: user.user_wallet_address,
      addresses: user.addresses.map((address: any) => ({
        addressName: address.address_name,
        roadAddress: address.road_address,
        addressDetail: address.address_detail,
      })),
      userAccountType: user.user_account_type,
    })
    result.push(userDto)
  }
  return result
}

async function getById(id: string) {
  try {
    const user = await User.findById(id).populate('addresses')
    return new userRequestDto({
      userName: user.user_name,
      userPasswordHash: user.user_password_hash,
      userPhone: user.user_phone,
      userEmail: user.user_email,
      userWalletAddress: user.user_wallet_address,
      addresses: user.addresses.map((address: any) => ({
        addressName: address.address_name,
        roadAddress: address.road_address,
        addressDetail: address.address_detail,
      })),
      userAccountType: user.user_account_type,
    })
  } catch {
    throw 'User Not Found'
  }
}

async function getCurrent() {
  try {
    const currentUserWalletAddress = headers().get('userWalletAddress')
    const user = await User.findOne({ user_wallet_address: currentUserWalletAddress }).populate('addresses')
    return new userRequestDto({
      userName: user.user_name,
      userPasswordHash: user.user_password_hash,
      userPhone: user.user_phone,
      userEmail: user.user_email,
      userWalletAddress: user.user_wallet_address,
      addresses: user.addresses.map((address: any) => ({
        addressName: address.address_name,
        roadAddress: address.road_address,
        addressDetail: address.address_detail,
      })),
      userAccountType: user.user_account_type,
    })
  } catch {
    throw 'Current User Not Found'
  }
}

async function create(params: any) {
  // validate
  if (await User.findOne({ user_wallet_address: params.user_wallet_address })) {
    throw 'UserWalletAddress "' + params.user_wallet_address + '"is already taken'
  }

  // user setting
  const user = new User(params)

  // hash password
  if (params.user_password) {
    user.user_password_hash = bcrypt.hashSync(params.user_password, 10)
  }

  await user.save()
}

async function update(id: string, params: any) {
  const user = await User.findById(id)

  // validate
  if (
    user.user_wallet_address !== params.user_wallet_address &&
    (await User.findOne({ user_wallet_address: params.user_wallet_address }))
  ) {
    throw 'UserWalletAddress "' + params.user_wallet_address + '" is already taken'
  }

  // hash password if it was entered
  if (params.user_password) {
    params.user_password_hash = bcrypt.hashSync(params.user_password, 10)
  }

  // copy params properties to user
  Object.assign(user, params)

  await user.save()
}

async function _softDelete(id: string) {
  const user = await User.findById(id)

  // validate
  if (user.deleted_date !== null) {
    throw 'UserWalletAddress "' + user.user_wallet_address + '"is Already Deleted'
  }

  // soft delete
  user.deleted_date = new Date()

  await user.save()
}

async function _delete(id: string) {
  await User.findByIdAndRemove(id)
}