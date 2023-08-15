export class AddressRequestDto {

  userId: string

  addressName: string

  roadAddress: string

  addressDetail: string


  constructor(addressDto: AddressRequestDto) {
    this.userId = addressDto.userId
    this.addressName = addressDto.addressName
    this.roadAddress = addressDto.roadAddress
    this.addressDetail = addressDto.addressDetail
  }
}