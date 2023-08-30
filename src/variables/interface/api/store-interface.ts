export interface StoreInfo {
  storeName: string
  storeTel: string
  storeEmail: string
  storeCategory: string
  storeOffDay: string
  storeOpenCloseTime: string
  storeStatus: string
}

export interface StoreInfoSave extends StoreInfo {
  save?(): any
}

export interface StoreInfoDelete extends StoreInfoSave {
  deletedDate: Date
}
