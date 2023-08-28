export interface AddressInfo {
  addressName: string
  roadAddress: string
  addressDetail: string

  save(): any
}

export interface DeleteAddressInfo extends AddressInfo {
  deletedDate: Date
}
