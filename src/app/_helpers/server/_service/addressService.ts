import { addressRepository } from '@/app/_helpers/server/_repository/addressRespository'
import { AddressInfo } from '@/variables/interface/api/address'
import isExistAddress from '@/utils/server/validate/validateAddress'
import { userRepository } from '@/app/_helpers/server/_repository/userRepository'

const getAddressById = async (id: string) => {
  const address = await addressRepository.getById(id)
  isExistAddress(address)
  return address
}

const getAddressByUserId = async (id: string) => {
  const addresses = await addressRepository.getByUser(await userRepository.getById(id))

  return addresses.map((address: AddressInfo) => {
    isExistAddress(address)
    return address
  })
}

const join = async (userId: string, params: AddressInfo) =>
  await addressRepository.save(userId, params)

const update = async (id: string, params: AddressInfo) => await addressRepository.update(id, params)

const _delete = async (id: string) => {
  isExistAddress(await addressRepository.getById(id))
  return addressRepository.delete(id)
}

export const addressService = {
  getAddressById,
  getAddressByUserId,
  join,
  update,
  delete: _delete,
}
