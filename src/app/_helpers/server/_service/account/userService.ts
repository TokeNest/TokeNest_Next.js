import { headers } from 'next/headers'
import { UserInfoUpdate } from '@/variables/interface/api/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { userRepository } from '@/app/_helpers/server/_repository/account/userRepository'

const createUser = async (params: UserInfoUpdate) => {
  // hash password
  params.userPasswordHash = bcrypt.hashSync(params.userPassword, 10)
  return (await userRepository.getByWalletAddress(params.userWalletAddress))
    ? Promise.reject('user already exist')
    : await userRepository.create(params)
}

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
    throw 'user not found'
  } else if (!bcrypt.compareSync(userPassword, user.userPasswordHash)) {
    throw 'password incorrect'
  }
  // create jwt token that is valid for 7 days
  const token = jwt.sign({ sub: user._id }, process.env.jwtSecret!, {
    expiresIn: '7d',
  })

  return { user, token }
}

const getUsers = async () => {
  const users = await userRepository.getAll()
  return users.length ? users : Promise.reject('user not found')
}

const getUserById = async (id: string) => {
  const user = await userRepository.getById(id)
  return user ? user : Promise.reject('user not found')
}

const getCurrentUser = async () => {
  const id = headers().get('userId')
  return id ? await userRepository.getById(id) : Promise.reject('user not found')
}

const updateUserById = async (id: string, params: UserInfoUpdate) => {
  // hash password
  params.userPasswordHash = bcrypt.hashSync(params.userPassword, 10)
  return (await userRepository.getById(id))
    ? userRepository.update(id, params)
    : Promise.reject('user not found')
}

const updateUserPasswordById = async (id: string, password: string) =>
  (await userRepository.getById(id))
    ? userRepository.updatePassword(id, bcrypt.hashSync(password, 10))
    : Promise.reject('user not found')

const softDeleteUserById = async (id: string) =>
  (await userRepository.getById(id))
    ? userRepository.softDelete(id)
    : Promise.reject('user not found')

// const _delete = async (id: string) => {
//   isExistUser(await userRepository.getById(id))
//   return userRepository.delete(id)
// }

export const userService = {
  createUser,
  authenticate,
  getUsers,
  getUserById,
  getCurrentUser,
  updateUserById,
  updateUserPasswordById,
  softDeleteUserById,
  // _delete,
}
