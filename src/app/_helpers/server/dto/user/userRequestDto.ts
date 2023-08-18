import { addressRequestDto } from '@/app/_helpers/server/dto/user/addressRequestDto'

export {userRequestDto}

class userRequestDto {
  userName: String
  userPassword: String
  userPhone: String
  userEmail: String
  userWalletAddress: String
  addresses: addressRequestDto[]
  userAccountType: String


  constructor(user: userRequestDto) {
    this.userName = user.userName
    this.userPassword = user.userPassword
    this.userPhone = user.userPhone
    this.userEmail = user.userEmail
    this.userWalletAddress = user.userWalletAddress
    this.addresses = user.addresses
    this.userAccountType = user.userAccountType
  }
}