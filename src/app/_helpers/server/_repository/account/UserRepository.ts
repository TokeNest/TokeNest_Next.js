import { db } from '../../db'
import {
  UserInfo,
  UserInfoAuth,
  UserInfoClient,
  UserinfoDelete,
  UserInfoSave,
  UserInfoUpdate,
} from '@/variables/interface/api/user-interface'
import { addressRepository } from '@/app/_helpers/server/_repository/account/AddressRepository'
import {
  addressProjection,
  userLoginProjection,
  userProjection,
} from '@/variables/projection/projection'

const User = db.User

const create = async (userInfo: UserInfo): Promise<string> =>
  (await new User({ ...userInfo }).save())._id

const getAll = async (): Promise<(Omit<UserInfoClient, never> & {})[]> =>
  User.find({ deletedDate: null }, userProjection)
    .populate({
      path: 'addresses',
      match: { deletedDate: { $eq: null } },
      select: addressProjection,
    })
    .exec()

const getById = async (id: string): Promise<UserInfoClient> =>
  User.findOne({ _id: id, deletedDate: null }, userProjection)
    .populate({
      path: 'addresses',
      match: { deletedDate: { $eq: null } },
      select: addressProjection,
    })
    .exec()

const getByWalletAddress = async (id: string): Promise<UserInfoAuth> =>
  User.findOne({ userWalletAddress: id, deletedDate: null }, userLoginProjection)
    .populate({
      path: 'addresses',
      match: { deletedDate: { $eq: null } },
      select: addressProjection,
    })
    .exec()

const update = async (id: string, userInfo: UserInfoSave): Promise<string> => {
  const user = (await getById(id)) as UserInfoSave
  Object.assign(user, userInfo)
  return (await user.save!())._id
}

const updatePassword = async (id: string, hashPassword: string): Promise<string> => {
  const user: UserInfoUpdate = await User.findOne({ _id: id, deletedDate: null }).exec()
  user.userPasswordHash = hashPassword
  return (await user.save!())._id
}

const softDelete = async (id: string): Promise<string> => {
  const user: UserinfoDelete = await User.findOne({ _id: id, deletedDate: null }).exec()
  user.deletedDate = new Date()
  await addressRepository.deleteByUserId(id)
  return (await user.save!())._id
}
// const _delete = async (id: string): Promise<string> => {
//   await addressRepository.deleteByUserId(id)
//   await User.findByIdAndRemove(id)
//   return id
// }

export const userRepository = {
  create,
  getAll,
  getById,
  getByWalletAddress,
  update,
  updatePassword,
  // delete: _delete,
  softDelete,
}
