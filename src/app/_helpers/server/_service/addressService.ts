import { addressRepository } from '@/app/_helpers/server/_repository/addressRespository'
import { addressMapper } from '@/utils/server/dtoMapping/addressMapper'
import { AddressInfo } from '@/variables/interface/api/address'
import { userRepository } from '@/app/_helpers/server/_repository'

const getAddressById = async function (id: string) {
  return addressMapper(await addressRepository.getById(id))
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

function _delete(id: string) {
  return addressRepository.delete(id)
}

export const addressService = {
  getAddressById,
  getAddressByUserId,
  join,
  update,
  delete: _delete,
}
