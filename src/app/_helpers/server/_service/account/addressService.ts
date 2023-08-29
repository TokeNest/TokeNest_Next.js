import { addressRepository } from '@/app/_helpers/server/_repository/account/addressRespository'
import { AddressInfo } from '@/variables/interface/api/address'
import { userRepository } from '@/app/_helpers/server/_repository/account/userRepository'

const getAddress = async (id: string) => {
  const address = await addressRepository.getById(id)
  return address ? address : Promise.reject('address not found')
}

const getAddresses = async (id: string) => {
  const addresses = await addressRepository.getByUserId(id)
  return addresses.length ? addresses : Promise.reject('address not found')
}

const createAddress = async (userId: string, params: AddressInfo) =>
  addressRepository.save(userId, params, await userRepository.getById(userId))

const updateAddress = async (id: string, params: AddressInfo) =>
  addressRepository.update(id, params)

const softDeleteAddress = async (id: string) => {
  return (await addressRepository.getById(id))
    ? addressRepository.softDelete(id)
    : Promise.reject('address not found')
}

// const deleteAddress = async (id: string) => {
//   isExistAddress(await addressRepository.getById(id))
//   return addressRepository.delete(id)
// }

export const addressService = {
  getAddress,
  getAddresses,
  createAddress,
  updateAddress,
  softDeleteAddress,
  // deleteAddress,
}
