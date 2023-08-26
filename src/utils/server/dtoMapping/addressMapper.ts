import { AddressInfo } from '@/variables/interface/api/address'
import { addressRequestDto } from '@/app/_helpers/server/dto/user/addressRequestDto'

export function addressMapper(address: AddressInfo) {
  return new addressRequestDto({
    addressName: address.addressName,
    roadAddress: address.roadAddress,
    addressDetail: address.addressDetail,
  })
}
