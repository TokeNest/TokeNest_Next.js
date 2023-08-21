import { AddressInfo } from '@/variables/interface/api/address'
import { addressRequestDto } from '@/app/_helpers/server/dto/user/addressRequestDto'

export function addressMapper(address: AddressInfo) {
  return new addressRequestDto({
    addressName: address.address_name,
    roadAddress: address.road_address,
    addressDetail: address.address_detail,
  })
}
