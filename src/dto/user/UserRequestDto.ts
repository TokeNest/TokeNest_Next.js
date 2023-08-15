import { AddressRequestDto } from '@/dto/common/AddressRequestDto'

export class UserRequestDto {

  userName: string;

  userPassword: string;

  userPhone: string;

  userEmail: string;

  userWalletAddress: string;

  userAccountType: string;

  addresses: AddressRequestDto[];


  constructor(user: UserRequestDto) {
    this.userName = user.userName
    this.userPassword = user.userPassword
    this.userPhone = user.userPhone
    this.userEmail = user.userEmail
    this.userWalletAddress = user.userWalletAddress
    this.userAccountType = user.userAccountType
    this.addresses = user.addresses
  }
}