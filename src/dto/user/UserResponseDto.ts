import { prop } from '@typegoose/typegoose';
import { Address } from '@/models/common/Address'
import { AddressResponseDto } from '@/dto/common/AddressResponseDto'

export class UserResponseDto {


  userName: string;

  userPassword: string;

  userPhone: string;

  userEmail: string;

  userWalletAddress: string;

  userAccountType: string;

  addresses: AddressResponseDto[]


  constructor(user: UserResponseDto) {
    this.userName = user.userName
    this.userPassword = user.userPassword
    this.userPhone = user.userPhone
    this.userEmail = user.userEmail
    this.userWalletAddress = user.userWalletAddress
    this.userAccountType = user.userAccountType
    this.addresses = user.addresses
  }

}