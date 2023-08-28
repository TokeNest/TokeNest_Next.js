import { userRepository } from '@/app/_helpers/server/_repository/account/userRepository'
import { UserInfo } from '@/variables/interface/api/user'

export const validUserAlreadyExistAsWalletAddress = async (userWalletAddress: string) => {
  if (await userRepository.getByWalletAddress(userWalletAddress)) {
    throw 'User Already Exist'
  }
}

export const isExistUser = (user: UserInfo) => {
  if (!user) {
    throw 'User Not Found'
  }
}
