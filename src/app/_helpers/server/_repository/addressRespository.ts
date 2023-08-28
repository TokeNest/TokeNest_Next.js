import { db } from '@/app/_helpers/server'
import { AddressInfo, DeleteAddressInfo } from '@/variables/interface/api/address'
import { UserInfo } from '@/variables/interface/api/user'

const Address = db.Address

const addressProjection = {
  addressName: true,
  roadAddress: true,
  addressDetail: true,
}

const getById = async (id: string): Promise<AddressInfo> =>
  await Address.findOne({ _id: id, deletedDate: null }, addressProjection).exec()

const getByUserId = async (id: string): Promise<AddressInfo[]> =>
  await Address.find({ user: id, deletedDate: null }, addressProjection).exec()

const save = async (id: string, addressInfo: AddressInfo, userInfo: UserInfo): Promise<string> => {
  const address = new Address({ user: id, ...addressInfo })
  await address.save()
  // setting relationship
  userInfo.addresses.push(address)
  await userInfo.save()
  return address._id
}

const update = async (id: string, addressInfo: AddressInfo): Promise<string> => {
  const address = await getById(id)
  Object.assign(address, addressInfo)
  return (await address.save())._id
}

const deleteByUserId = async (id: string): Promise<Promise<string>[]> => {
  const addresses: DeleteAddressInfo[] = await Address.find({
    user: id,
    deletedDate: null,
  }).exec()
  return addresses.map(async (address): Promise<string> => {
    address.deletedDate = new Date()
    return (await address.save())._id
  })
}

const softDelete = async (id: string): Promise<string> => {
  const address: DeleteAddressInfo = await Address.findOne({
    _id: id,
    deletedDate: null,
  }).exec()
  address.deletedDate = new Date()
  return (await address.save())._id
}

// const _delete = async (id: string): Promise<string> => {
//   await Address.findByIdAndRemove(id).exec()
//   return id
// }

export const addressRepository = {
  getById,
  getByUserId,
  save,
  update,
  softDelete,
  // delete: _delete,
  deleteByUserId,
}
