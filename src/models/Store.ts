import { nanoid } from 'nanoid'
import { prop } from '@typegoose/typegoose'

export class Store {
  @prop({ default: () => nanoid(9) })
  _id: string

  @prop()
  name: string
}
