export interface AccountInfo {
  user_name: string
  user_password: string
  user_phone: string
  user_email: string
  user_wallet_address: string
  user_account_type: string
}
export interface createAccountInfo extends AccountInfo {}

export interface updateAccountInfo extends AccountInfo {
  user_password_hash: string
}
