export interface AddressInfo {
  addressName: string
  roadAddress: string
  addressDetail: string

  save(): any
}

export interface AddressInfoDelete extends AddressInfo {
  deletedDate: Date
}
