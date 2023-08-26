import { db } from '@/app/_helpers/server'
import { UserInfo } from '@/variables/interface/api/user'
import { AddressInfo } from '@/variables/interface/api/address'

const Address = db.Address
const User = db.User

const getById = async function (id: string) {
  return Address.findById(id).exec()
}

const getByUser = async function (userInfo: UserInfo) {
  return Address.find({ user: new User({ ...userInfo }) }).exec()
}

const save = async function (id: string, addressInfo: AddressInfo) {
  const user = await User.findOne({ id: id, deletedDate: null }).exec()
  const address = new Address({ user, ...addressInfo })
  address.save()
  // setting relationship
  user.addresses.push(address)
  user.save()
  return address._id
}

const update = async function (id: string, addressInfo: AddressInfo) {
  const address = await getById(id)
  Object.assign(address, addressInfo)
  address.save()
  return address._id
}

const _delete = async function (id: string) {
  await Address.findByIdAndRemove(id).exec()
  return id
}

export const addressRepository = {
  getById,
  getByUser,
  save,
  update,
  delete: _delete,
}
