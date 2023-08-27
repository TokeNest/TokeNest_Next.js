import { headers } from 'next/headers'
import { SaveUserInfo } from '@/variables/interface/api/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { userRepository } from '@/app/_helpers/server/_repository/userRepository'
import {
  isExistUser,
  validUserAlreadyExistAsWalletAddress,
} from '@/utils/server/validate/validateUser'

const authenticate = async ({
  userWalletAddress,
  userPassword,
}: {
  userWalletAddress: string
  userPassword: string
}) => {
  const user = await userRepository.getByWalletAddress(userWalletAddress)
  // validate user info
  if (!user) {
    throw 'This User is not exist or already deleted.'
  } else if (!bcrypt.compareSync(userPassword, user.userPasswordHash)) {
    throw 'Invalid Value: password is incorrect'
  }
  // create jwt token that is valid for7 days
  const token = jwt.sign({ sub: user.id }, process.env.jwtSecret!, {
    expiresIn: '7d',
  })

  return { user, token }
}

const getUsers = async () => (await userRepository.getAll()).map((user: Omit<any, never>) => user)

const getUserById = async (id: string) => {
  // isExistUser(id)
  return await userRepository.getById(id)
}

const getCurrentUser = async () => {
  const id = headers().get('user_id')
  if (!id) {
    throw 'User Not Found'
  }
  return await userRepository.getById(id)
}

const join = async (params: SaveUserInfo) => {
  // hash password
  const user = params
  if (params.userPassword) {
    user.userPasswordHash = bcrypt.hashSync(params.userPassword, 10)
  }

  // validate
  await validUserAlreadyExistAsWalletAddress(params.userWalletAddress)
  return await userRepository.save(user)
}

const update = (id: string, params: SaveUserInfo) => {
  // hash password if it was entered
  if (params.userPassword) {
    params.userPasswordHash = bcrypt.hashSync(params.userPassword, 10)
  }
  // copy params properties to find
  return userRepository.update(id, params)
}

const softDelete = async (id: string) => {
  return userRepository.softDelete(id)
}

const _delete = async (id: string) => {
  isExistUser(await userRepository.getById(id))
  return await userRepository.delete(id)
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
