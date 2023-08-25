import { userRepository } from '@/app/_helpers/server/_repository'

export const validUserAlreadyExistAsWalletAddress = async function (user_wallet_address: string) {
  if (await userRepository.getByAddress(user_wallet_address)) {
    return { success: false, error: 'Error: User Already Exist' }
  }
  return true
}
