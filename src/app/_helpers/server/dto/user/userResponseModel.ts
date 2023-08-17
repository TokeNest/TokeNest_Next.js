import { prop } from '@typegoose/typegoose';
import { Address } from '@/models/common/address'

export class UserResponseModel {

  @prop()
  userName: string;

  @prop()
  userPassword: string;

  @prop()
  userPhone: string;

  @prop()
  userEmail: string;

  @prop()
  userWalletAddress: string;

  @prop()
  userAccountType: string;

  @prop()
  userStatus: string; // 1 == 활동중, 0 == 활동정지

  /**
   * 컬렉션 관계설정
   */
  @prop({ type: () => [Address] })
  addresses: Address[]
}
