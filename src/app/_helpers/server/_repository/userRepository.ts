import { db } from '../db'
import { UserInfo } from '@/variables/interface/api/user'

const User = db.User
const userFilter = {
  userName: true,
  userPasswordHash: true,
  userPhone: true,
  userEmail: true,
  userWalletAddress: true,
  userAccountType: true,
}
const addressFilter = {
  addressName: true,
  roadAddress: true,
  addressDetail: true,
}

const getAll = async (): Promise<(Omit<any, never> & {})[]> =>
  await User.find({ deletedDate: null }, userFilter).populate('addresses', addressFilter).exec()

const getById = async (id: string): Promise<UserInfo> =>
  await User.findOne({ _id: id, deletedDate: null }, userFilter)
    .populate('addresses', addressFilter)
    .exec()

const getByWalletAddress = async (id: string): Promise<UserInfo> =>
  await User.findOne({ userWalletAddress: id, deletedDate: null }, userFilter)
    .populate('addresses', addressFilter)
    .exec()

const save = (userInfo: UserInfo): Promise<string> => {
  const user = new User({ ...userInfo })
  user.save()
  return user._id
}

const update = async function (id: string, userInfo: UserInfo): Promise<string> {
  const user = await User.findById(id).exec()
  Object.assign(user, userInfo)
  await user.save()
  return user._id
}

const softDelete = async function (id: string): Promise<string> {
  const user = await User.findById(id).exec()
  user.deletedDate = new Date()
  return (await user.save())._id
}
const _delete = async function (id: string): Promise<string> {
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
