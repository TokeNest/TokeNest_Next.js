import { userRepository } from '@/app/_helpers/server/_repository'

const validUserAlreadyExistAsWalletAddress = async function (userWalletAddress: string) {
  if (await userRepository.getByAddress(userWalletAddress)) {
    throw new Error('User Already Exist')
  }
}

export { validUserAlreadyExistAsWalletAddress }
