import { nanoid } from 'nanoid'
import { prop } from '@typegoose/typegoose'

export class Store {
  @prop({ default: () => nanoid() })
  _id: string

  @prop()
  store_name: string

  @prop()
  store_tel: string

  @prop()
  store_email: string

  @prop()
  store_category: string

  @prop()
  store_off_day: string

  @prop()
  store_open_and_close_time: string

  @prop()
  store_status: string

  @prop({ default: () => new Date() })
  created_date: Date

  @prop({ default: () => new Date() })
  updated_date: Date

  @prop()
  deleted_date: Date
}
