import { AddressInfo } from '@/variables/interface/api/address'

export default function isExistAddress(address: AddressInfo) {
  if (address === null) {
    throw 'Address Not Found'
  }
}
