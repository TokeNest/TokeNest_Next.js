import { AddressInfo } from '@/variables/interface/api/address'

export interface UserInfo {
  id: string
  userName: string
  userPasswordHash: string
  userPhone: string
  userEmail: string
  userWalletAddress: string
  addresses: AddressInfo[]
  userAccountType: string
}
export interface SaveUserInfo extends UserInfo {
  userPassword: string
}
