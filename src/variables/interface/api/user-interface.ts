import {
  AddressInfo,
  AddressInfoClient,
  AddressInfoDelete,
} from '@/variables/interface/api/address-interface'

export interface UserInfo {
  userName: string
  userPhone: string
  userEmail: string
  userWalletAddress: string
  addresses: AddressInfo[]
  userAccountType: string
}

export interface UserInfoSave extends UserInfo {
  save?(): any
}

export interface UserInfoUpdate extends UserInfoSave {
  userPasswordHash: string
  userPassword: string
}

export interface UserinfoDelete extends UserInfoSave {
  deletedDate: Date
  addresses: AddressInfoDelete[]
}

export interface UserInfoAuth extends UserInfo {
  _id: string
  userPasswordHash: string
}

export interface UserInfoClient extends UserInfo {
  id: string
  addresses: AddressInfoClient[]
}
