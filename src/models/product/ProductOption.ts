import { prop } from '@typegoose/typegoose'
import { nanoid } from 'nanoid'

export class ProductOption {
  @prop({ default: () => nanoid() })
  _id: string

  @prop()
  option_name: string

  @prop()
  option_price: string

  @prop()
  is_default: boolean

  @prop({ default: () => new Date() })
  created_date: Date

  @prop({ default: () => new Date() })
  updated_date: Date

  @prop()
  deleted_date: Date
}
