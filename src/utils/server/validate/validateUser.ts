import { userRepository } from '@/app/_helpers/server/_repository/userRepository'
import { UserInfo } from '@/variables/interface/api/user'

export const validUserAlreadyExistAsWalletAddress = async function (userWalletAddress: string) {
  if (await userRepository.getByWalletAddress(userWalletAddress)) {
    throw 'User Already Exist'
  }
}

export const isExistUser = function (user: UserInfo) {
  if (!user) {
    throw 'User Not Found'
  }
}
