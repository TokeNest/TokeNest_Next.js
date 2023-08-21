import { userRepository } from '@/app/_helpers/server/_repository'
import { userInfoMapper } from '@/utils/server/dtoMapping/userMapper'
import { headers } from 'next/headers'
import { saveUserInfo } from '@/variables/interface/api/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validUserAlreadyExistAsWalletAddress } from '@/utils/server/validate/validUserAlreadyExist'

const authenticate = async function ({
  user_wallet_address,
  user_password,
}: {
  user_wallet_address: string
  user_password: string
}) {
  const user = await userRepository.getByAddress(user_wallet_address)
  // validate user info
  if (!user) {
    throw new Error('This User is not exist or already deleted.')
  } else if (!bcrypt.compareSync(user_password, user.user_password_hash)) {
    throw 'Invalid Value: password is incorrect'
  }
  // create jwt token that is valid for7 days
  const token = jwt.sign({ sub: user._id }, process.env.jwtSecret!, {
    expiresIn: '7d',
  })

  return { user, token }
}

const getUsers = async function () {
  return (await userRepository.getAll()).map((user) => {
    return userInfoMapper(user)
  })
}

const getUserById = async function (id: string) {
  return userInfoMapper(await userRepository.getById(id))
}

const getCurrentUser = async function () {
  const id = headers().get('user_id')
  if (!id) {
    throw new Error('user not found')
  }
  return userInfoMapper(await userRepository.getById(id))
}

const join = async function (params: saveUserInfo) {
  // hash password
  const user = params
  if (params.user_password) {
    user.user_password_hash = bcrypt.hashSync(params.user_password, 10)
  }
  // validate
  await validUserAlreadyExistAsWalletAddress(user.user_wallet_address)

  return userRepository.save(user)
}

function update(id: string, params: saveUserInfo) {
  // hash password if it was entered
  if (params.user_password) {
    params.user_password_hash = bcrypt.hashSync(params.user_password, 10)
  }
  // copy params properties to find
  return userRepository.update(id, params)
}

const softDelete = async function (id: string) {
  return userRepository.softDelete(id)
}

function _delete(id: string) {
  return userRepository.delete(id)
}

export const userService = {
  authenticate,
  getUsers,
  getUserById,
  getCurrentUser,
  join,
  update,
  softDelete,
  _delete,
}
