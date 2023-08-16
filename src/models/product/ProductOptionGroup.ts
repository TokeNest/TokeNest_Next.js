import { prop } from '@typegoose/typegoose'
import { nanoid } from 'nanoid'
import { ProductOption } from '@/models/product/ProductOption'

export class ProductOptionGroup {
  @prop({ default: () => nanoid() })
  _id: string

  @prop()
  option_group_name: string

  @prop()
  is_duplicate: boolean

  @prop()
  is_require: boolean

  @prop({ default: () => new Date() })
  created_date: Date

  @prop({ default: () => new Date() })
  updated_date: Date

  @prop()
  deleted_date: Date

  @prop()
  options: ProductOption[]
}
