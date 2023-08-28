import { db } from '../db'
import { UserInfo } from '@/variables/interface/api/user'
import { addressRepository } from '@/app/_helpers/server/_repository/addressRespository'

const User = db.User
const userProjection = {
  userName: true,
  userPasswordHash: true,
  userPhone: true,
  userEmail: true,
  userWalletAddress: true,
  userAccountType: true,
}
const addressProjection = {
  addressName: true,
  roadAddress: true,
  addressDetail: true,
}

const getAll = async (): Promise<(Omit<UserInfo, never> & {})[]> =>
  await User.find({ deletedDate: null }, userProjection)
    .populate('addresses', addressProjection)
    .exec()

const getById = async (id: string): Promise<UserInfo> =>
  await User.findOne({ _id: id, deletedDate: null }, userProjection)
    .populate('addresses', addressProjection)
    .exec()

const getByWalletAddress = async (id: string): Promise<UserInfo> =>
  await User.findOne({ userWalletAddress: id, deletedDate: null }, userProjection)
    .populate('addresses', addressProjection)
    .exec()

const save = async (userInfo: UserInfo): Promise<string> =>
  (await new User({ ...userInfo }).save())._id

const update = async (id: string, userInfo: UserInfo): Promise<string> => {
  const user = await User.findOne({ _id: id, deletedDate: null }).exec()
  Object.assign(user, userInfo)
  await user.save()
  return user._id
}

const softDelete = async (id: string): Promise<string> => {
  const user = await User.findOne({ _id: id, deletedDate: null }).exec()
  user.deletedDate = new Date()
  return (await user.save())._id
}
const _delete = async (id: string): Promise<string> => {
  await addressRepository.deleteByUserId(id)
  await User.findByIdAndRemove(id)
  return id
}

export const userRepository = {
  getAll,
  getById,
  getByWalletAddress,
  save,
  update,
  delete: _delete,
  softDelete,
}
