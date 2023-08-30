import { db } from '@/app/_helpers/server'
import {
  AddressInfo,
  AddressInfoClient,
  AddressInfoCreate,
  AddressInfoDelete,
} from '@/variables/interface/api/address-interface'
import { UserInfoCreate } from '@/variables/interface/api/user-interface'
import { addressProjection } from '@/variables/projection/projection'

const Address = db.Address

const create = async (
  id: string,
  addressInfo: AddressInfo,
  userInfo: UserInfoCreate
): Promise<string> => {
  const address = new Address({ user: id, ...addressInfo })
  await address.save()
  // setting relationship
  userInfo.addresses.push(address)
  await userInfo.save!()
  return address._id
}

const getById = async (id: string): Promise<AddressInfoClient> =>
  Address.findOne({ _id: id, deletedDate: null }, addressProjection).exec()

const getByUserId = async (id: string): Promise<AddressInfoClient[]> =>
  Address.find({ user: id, deletedDate: null }, addressProjection).exec()

const update = async (id: string, addressInfo: AddressInfo): Promise<string> => {
  const address: AddressInfoCreate = await getById(id)
  Object.assign(address, addressInfo)
  return (await address.save!())._id
}

const softDelete = async (id: string): Promise<string> => {
  const address: AddressInfoDelete = await Address.findOne({
    _id: id,
    deletedDate: null,
  }).exec()
  address.deletedDate = new Date()
  return (await address.save!())._id
}

// const _delete = async (id: string): Promise<string> => {
//   await Address.findByIdAndRemove(id).exec()
//   return id
// }

export const addressRepository = {
  create,
  getById,
  getByUserId,
  update,
  softDelete,
  // delete: _delete,
}
