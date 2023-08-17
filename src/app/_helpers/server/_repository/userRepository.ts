import { db } from '../db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { headers } from 'next/headers'

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

async function authenticate({ userId, password }: { userId: string; password: string }) {
  const user = await User.findOne({ userId })

  if (!(user && bcrypt.compareSync(password, user.user_hash))) {
    throw 'Invalid Value: UserWalletAddress or password is incorrect'
  }

  // create jwt token that is valid for7 days
  const token = jwt.sign({ sub: user.user_wallet_address }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  })

  return {
    user: user.toJSON(),
    token,
  }
}

async function getAll() {
  return await User.find()
}

async function getById(id: string) {
  try {
    return await User.findById(id)
  } catch {
    throw 'User Not Found'
  }
}

async function getCurrent() {
  try {
    const currentUserId = headers().get('userId')
    return await User.findById(currentUserId)
  } catch {
    throw 'Current User Not Found'
  }
}

async function create(params: any) {
  if (await User.findOne({ user_wallet_address: params.user_wallet_address })) {
    throw 'UserWalletAddress "' + params.user_wallet_address + '"is already taken'
  }

  const user = new User(params)

  // hash password
  if (params.password) {
    user.user_hash = bcrypt.hashSync(params.password, 10)
  }

  await user.save()
}

async function update(id: string, params: any) {
  const user = await getById(id)

  // validate
  if (
    user.user_wallet_address !== params.user_wallet_address &&
    (await User.findOne({ user_wallet_address: params.user_wallet_address }))
  ) {
    throw 'UserWalletAddress "' + params.user_wallet_address + '" is already taken'
  }

  // hash password if it was entered
  if (params.user_password) {
    params.user_hash = bcrypt.hashSync(params.user_password, 10)
  }

  // copy params properties to user
  Object.assign(user, params)

  await user.save()
}

async function _softDelete(id: string) {
  const user = await getById(id)

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
