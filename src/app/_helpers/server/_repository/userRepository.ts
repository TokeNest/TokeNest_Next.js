import { db } from '../db'
import { UserInfo } from '@/variables/interface/api/user'

const User = db.User

const getAll = async function () {
  return User.find({ deletedDate: null }).populate('addresses').exec()
}

const getById = async function (id: string) {
  return User.findOne({ id: id, deletedDate: null }).populate('addresses').exec()
}

const getByAddress = async function (id: string) {
  return User.findOne({ userWalletAddress: id, deletedDate: null }).exec()
}

const save = async function (userInfo: UserInfo): Promise<string> {
  const user = await new User({ ...userInfo }).save()
  return user._id
}

const update = async function (id: string, userInfo: UserInfo): Promise<string> {
  const user = await getById(id)
  Object.assign(user, userInfo)
  return (await user.save())._id
}

const softDelete = async function (id: string): Promise<string> {
  const user = await getById(id)
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
  getByAddress,
  save,
  update,
  delete: _delete,
  softDelete,
}
