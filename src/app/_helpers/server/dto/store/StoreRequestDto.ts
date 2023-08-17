export class StoreRequestDto {
  store_name: string
  store_tel: string
  store_email: string
  store_category: string
  store_off_day: string
  store_open_and_close_time: string
  store_status: string

  // toModel() {
  //   return new StoreModel({
  //     store_name: this.store_name,
  //     store_tel: this.store_tel,
  //     store_email: this.store_email,
  //     store_category: this.store_category,
  //     store_off_day: this.store_off_day,
  //     store_open_and_close_time: this.store_open_and_close_time,
  //     store_status: this.store_status,
  //   })
  // }
}
