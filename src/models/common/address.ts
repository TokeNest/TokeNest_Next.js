import { nanoid } from 'nanoid';
import { prop } from '@typegoose/typegoose';


export class Address {
  @prop({ default: () => nanoid(9) })
  _id: string;

  @prop()
  addressName: string

  @prop()
  roadAddress: string

  @prop()
  addressDetail: string

  @prop({ default: () => new Date })
  createdDate: Date

  @prop({ default: () => new Date })
  updatedDate: Date

  @prop()
  deletedDate: Date

}
