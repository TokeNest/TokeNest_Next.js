import { db } from '@/app/_helpers/server'
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

const getByUser = async (id: string): Promise<AddressInfo[]> =>
  await Address.find({ user: id }, addressFilter).exec()

const save = async (id: string, addressInfo: AddressInfo): Promise<string> => {
  const user = await User.findOne({ _id: id, deletedDate: null }).exec()
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

const _delete = async (id: string): Promise<string> => {
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
