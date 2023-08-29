import { AddressInfo, AddressInfoDelete } from '@/variables/interface/api/address'

export interface UserInfo {
  userName: string
  userPhone: string
  userEmail: string
  userWalletAddress: string
  addresses: AddressInfo[]
  userAccountType: string

  save(): any
}
export interface UserInfoUpdate extends UserInfo {
  userPasswordHash: string
  userPassword: string
}

export interface UserinfoDelete extends UserInfo {
  deletedDate: Date
  addresses: AddressInfoDelete[]
}

export interface UserInfoAuth extends UserInfo {
  _id: string
  userPasswordHash: string
}
