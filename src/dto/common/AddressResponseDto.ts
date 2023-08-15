export class AddressResponseDto {

  addressName: string

  roadAddress: string

  addressDetail: string


  constructor(addressName: string, roadAddress: string, addressDetail: string) {
    this.addressName = addressName
    this.roadAddress = roadAddress
    this.addressDetail = addressDetail
  }
}