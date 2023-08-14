import { prop } from '@typegoose/typegoose'
import { nanoid } from 'nanoid'

export class User {
  @prop({ default: () => nanoid(9) })
  _id: string

  @prop()
  name: string

  @prop({ default: () => new Date() })
  create_date: Date
}
