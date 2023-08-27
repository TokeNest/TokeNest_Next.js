import { addressRepository } from '@/app/_helpers/server/_repository/addressRespository'
import { addressMapper } from '@/utils/server/dtoMapping/addressMapper'
import { AddressInfo } from '@/variables/interface/api/address'
import { userRepository } from '@/app/_helpers/server/_repository'
import ValidateAddressNotExist from '@/utils/server/validate/validateAddress'

const getAddressById = async function (id: string) {
  const address = await addressRepository.getById(id)
  ValidateAddressNotExist(address)
  return addressMapper(address)
}

const getAddressByUserId = async function (id: string) {
  const users = await userRepository.getById(id)
  if (!users) {
    throw new Error('User not Found')
  }
  return users.addresses.map((address: AddressInfo) => {
    return addressMapper(address)
  })
}

const join = async function (userId: string, params: AddressInfo) {
  return addressRepository.save(userId, params)
}

const update = async function (id: string, params: AddressInfo) {
  return addressRepository.update(id, params)
}

const _delete = async function (id: string) {
  ValidateAddressNotExist(await addressRepository.getById(id))
  return addressRepository.delete(id)
}

export const addressService = {
  getAddressById,
  getAddressByUserId,
  join,
  update,
  delete: _delete,
}
