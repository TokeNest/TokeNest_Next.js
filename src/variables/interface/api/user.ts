import { AddressInfo, DeleteAddressInfo } from '@/variables/interface/api/address'

export interface UserInfo {
  id: string
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
  addresses: DeleteAddressInfo[]
}
