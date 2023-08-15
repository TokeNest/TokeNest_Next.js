import { prop } from '@typegoose/typegoose'
import type { Ref } from '@typegoose/typegoose'
import { nanoid } from 'nanoid'
import { User } from '../user/User'

export class Address {

  @prop({ default: () => nanoid() })
  _id: string

  @prop({
    ref: () => User,
    localField: 'user',
    foreignField: 'addresses'
  }) // User 컬렉션과의 관계 설정
  user: Ref<User>;

  @prop()
  addressName: string

  @prop()
  roadAddress: string

  @prop()
  addressDetail: string

  @prop({ default: () => new Date() })
  createdDate: Date;

  @prop({ default: () => new Date() })
  updatedDate: Date;

  @prop()
  deletedDate: Date;

}