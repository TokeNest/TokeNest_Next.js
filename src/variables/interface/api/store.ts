export interface StoreInfo {
  storeName: string
  storeTel: string
  storeEmail: string
  storeCategory: string
  storeOffDay: string
  storeOpenCloseTime: string
  storeStatus: string

  save(): any
}

export interface StoreInfoDelete extends StoreInfo {
  deletedDate: Date
}
