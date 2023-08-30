export interface StoreInfo {
  storeName: string
  storeTel: string
  storeEmail: string
  storeCategory: string
  storeOffDay: string
  storeOpenCloseTime: string
  storeStatus: string
}

export interface StoreInfoCreate extends StoreInfo {
  save?(): any
}

export interface StoreInfoDelete extends StoreInfoCreate {
  deletedDate: Date
}

export interface StoreInfoClient extends StoreInfo {
  id: string
}
