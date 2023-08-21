import { userRequestDto } from '@/app/_helpers/server/dto/user/userRequestDto'
import { AddressInfo } from '@/variables/interface/api/address'

export function userInfoMapper(user: Omit<any, never> & {}) {
  return new userRequestDto({
    userName: user.user_name,
    userPasswordHash: user.user_password_hash,
    userPhone: user.user_phone,
    userEmail: user.user_email,
    userWalletAddress: user.user_wallet_address,
    addresses: user.addresses.map((address: AddressInfo) => ({
      addressName: address.address_name,
      roadAddress: address.road_address,
      addressDetail: address.address_detail,
    })),
    userAccountType: user.user_account_type,
  })
}
