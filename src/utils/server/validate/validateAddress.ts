import { AddressInfo } from '@/variables/interface/api/address'

export default function isExistAddress(address: AddressInfo) {
  if (!address) {
    throw 'Address Not Found'
  }
}
