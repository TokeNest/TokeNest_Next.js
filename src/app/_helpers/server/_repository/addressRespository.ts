import { db } from '@/app/_helpers/server'
import { UserInfo } from '@/variables/interface/api/user'
import { AddressInfo } from '@/variables/interface/api/address'

const Address = db.Address
const User = db.User

const addressFilter = {
  addressName: true,
  roadAddress: true,
  addressDetail: true,
}

const getById = async (id: string): Promise<AddressInfo> =>
  await Address.findById(id, addressFilter).exec()

const getByUser = async (userInfo: UserInfo): Promise<AddressInfo[]> =>
  await Address.find({ user: new User({ ...userInfo }) }, addressFilter).exec()

const save = async (id: string, addressInfo: AddressInfo): Promise<string> => {
  const user = await User.findOne({ id: id, deletedDate: null }).exec()
  const address = new Address({ user, ...addressInfo })
  address.save()
  // setting relationship
  user.addresses.push(address)
  user.save()
  return address._id
}

const update = async (id: string, addressInfo: AddressInfo): Promise<string> => {
  const address = await Address.findById(id)
  Object.assign(address, addressInfo)
  address.save()
  return address._id
}

const _delete = (id: string): string => {
  Address.findByIdAndRemove(id)
  return id
}

export const addressRepository = {
  getById,
  getByUser,
  save,
  update,
  delete: _delete,
}
