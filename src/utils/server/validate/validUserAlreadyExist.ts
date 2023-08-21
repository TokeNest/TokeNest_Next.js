import { userRepository } from '@/app/_helpers/server/_repository'

const validUserAlreadyExistAsWalletAddress = async function (user_wallet_address: string) {
  if (await userRepository.getByAddress(user_wallet_address)) {
    throw new Error('User Already Exist')
  }
}

export { validUserAlreadyExistAsWalletAddress }
