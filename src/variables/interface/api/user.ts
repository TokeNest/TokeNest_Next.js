import { AddressInfo, AddressInfoDelete } from '@/variables/interface/api/address'

export interface UserInfo {
  userName: string
  userPasswordHash: string
  userPhone: string
  userEmail: string
  userWalletAddress: string
  addresses: AddressInfo[]
  userAccountType: string

  save(): any
}
export interface SaveUserInfo extends UserInfo {
  userPassword: string
}

export interface DeleteUserInfo extends UserInfo {
  deletedDate: Date
  addresses: AddressInfoDelete[]
}

export interface UserInfoWithId extends UserInfo {
  _id: string
}
