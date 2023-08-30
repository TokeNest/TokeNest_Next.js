import { addressRepository } from '@/app/_helpers/server/_repository/account/AddressRepository'
import { AddressInfo } from '@/variables/interface/api/address-interface'
import { userRepository } from '@/app/_helpers/server/_repository/account/UserRepository'

const createAddressByUserId = async (userId: string, params: AddressInfo) =>
  addressRepository.create(userId, params, await userRepository.getById(userId))

const getAddressById = async (id: string) => {
  const address = await addressRepository.getById(id)
  return address ? address : Promise.reject('address not found')
}

const getAddressesByUserId = async (id: string) => {
  const addresses = await addressRepository.getByUserId(id)
  return addresses.length ? addresses : Promise.reject('address not found')
}

const updateAddressById = async (id: string, params: AddressInfo) =>
  (await addressRepository.getById(id))
    ? addressRepository.update(id, params)
    : Promise.reject('address not found')

const softDeleteAddressByUserId = async (id: string) => addressRepository.softDeleteByUserId(id)

const softDeleteAddressById = async (id: string) =>
  (await addressRepository.getById(id))
    ? addressRepository.softDelete(id)
    : Promise.reject('address not found')

// const deleteAddress = async (id: string) => {
//   isExistAddress(await addressRepository.getById(id))
//   return addressRepository.delete(id)
// }

export const addressService = {
  createAddressByUserId,
  getAddressById,
  getAddressesByUserId,
  updateAddressById,
  softDeleteAddressByUserId,
  softDeleteAddressById,
  // deleteAddress,
}
