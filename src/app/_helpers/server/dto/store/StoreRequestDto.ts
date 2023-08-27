export class StoreRequestDto {
  storeName: string
  storeTel: string
  storeEmail: string
  storeCategory: string
  storeOffDay: string
  store_open_and_close_time: string
  storeStatus: string

  // toModel() {
  //   return new StoreModel({
  //     storeName: this.storeName,
  //     storeTel: this.storeTel,
  //     storeEmail: this.storeEmail,
  //     storeCategory: this.storeCategory,
  //     storeOffDay: this.storeOffDay,
  //     store_open_and_close_time: this.store_open_and_close_time,
  //     storeStatus: this.storeStatus,
  //   })
  // }
}
