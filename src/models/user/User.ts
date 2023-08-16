import { prop } from '@typegoose/typegoose'
import { nanoid } from 'nanoid'

export class User {
  @prop({ default: () => nanoid() })
  _id: string

  @prop()
  name: string

  @prop({ default: () => new Date() })
  created_date: Date

  @prop({ default: () => new Date() })
  updated_date: Date

  @prop()
  deleted_date?: Date
}
