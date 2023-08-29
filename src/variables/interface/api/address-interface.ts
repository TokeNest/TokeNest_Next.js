export interface AddressInfo {
  addressName: string
  roadAddress: string
  addressDetail: string
}

export interface AddressInfoSave extends AddressInfo {
  save?(): any
}

export interface AddressInfoDelete extends AddressInfoSave {
  deletedDate: Date
}

export interface AddressInfoClient extends AddressInfo {
  id: string
}
