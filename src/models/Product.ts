import { prop } from '@typegoose/typegoose'
import { nanoid } from 'nanoid'

export class Product {
  @prop({ default: nanoid(9) })
  _id: string

  @prop()
  product_name: string

  @prop()
  product_info: string

  @prop()
  product_status: string

  @prop()
  product_intro: string

  @prop()
  product_price: number

  @prop({ default: () => new Date() })
  created_date: Date

  @prop({ default: () => new Date() })
  updated_date: Date

  @prop()
  deleted_date: Date

  @prop()
  product_option_group: {}
}
