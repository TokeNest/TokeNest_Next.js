import { AddressInfo } from '@/variables/interface/api/address'

export interface UserInfo {
  user_name: string
  user_password_hash: string
  user_phone: string
  user_email: string
  user_wallet_address: string
  addresses: AddressInfo[]
  user_account_type: string
}
export interface SaveUserInfo extends UserInfo {
  user_password: string
}
