export interface AddressInfo {
  addressName: string
  roadAddress: string
  addressDetail: string
}

export interface AddressInfoCreate extends AddressInfo {
  save?(): any
}

export interface AddressInfoDelete extends AddressInfoCreate {
  deletedDate: Date
}

export interface AddressInfoClient extends AddressInfo {
  id: string
}
