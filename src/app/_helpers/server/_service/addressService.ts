import { addressRepository } from '@/app/_helpers/server/_repository/addressRespository'
import { AddressInfo } from '@/variables/interface/api/address'
import isExistAddress from '@/utils/server/validate/validateAddress'
import { userRepository } from '@/app/_helpers/server/_repository/userRepository'

const getAddress = async (id: string) => {
  const address = await addressRepository.getById(id)
  isExistAddress(address)
  return address
}

const getAddresses = async (id: string) => {
  const addresses = await addressRepository.getByUserId(id)

  return addresses.map((address: AddressInfo) => {
    isExistAddress(address)
    return address
  })
}

const createAddress = async (userId: string, params: AddressInfo) =>
  await addressRepository.save(userId, params, await userRepository.getById(userId))

const updateAddress = async (id: string, params: AddressInfo) =>
  await addressRepository.update(id, params)

const deleteAddress = async (id: string) => {
  isExistAddress(await addressRepository.getById(id))
  return addressRepository.delete(id)
}

export const addressService = {
  getAddress,
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
}
