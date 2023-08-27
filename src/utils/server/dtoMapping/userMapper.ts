import { userRequestDto } from '@/app/_helpers/server/dto/user/userRequestDto'
import { AddressInfo } from '@/variables/interface/api/address'

export function userInfoMapper(user: Omit<any, never> & {}) {
  return new userRequestDto({
    userName: user.user_name,
    userPasswordHash: user.user_password_hash,
    userPhone: user.user_phone,
    userEmail: user.user_email,
    userWalletAddress: user.userWalletAddress,
    addresses: user.addresses.map((address: AddressInfo) => ({
      addressName: address.addressName,
      roadAddress: address.roadAddress,
      addressDetail: address.addressDetail,
    })),
    userAccountType: user.user_account_type,
  })
}
