import { nanoid } from 'nanoid';
import { prop } from '@typegoose/typegoose'
import type { Ref } from '@typegoose/typegoose'
import { Address } from '../common/Address'

export class User {
  @prop({ default: () => nanoid() })
  _id: string;

  @prop({
    required: true,
    message: '닉네임은 필수 입력 값입니다.'
  })
  userName: string;

  @prop({
    required: true,
    match: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{8,20}$/,
    message: '비밀번호는 영문 대,소문자와 숫자, 특수기호가 적어도 1개 이상씩 포함된 8자 ~ 20자의 비밀번호여야 합니다.'
  })
  userPassword: string;

  @prop({
    required: true,
    match: /^[0-9]{9,11}$/,
    message: '전화번호는 9자리 이상 11자리 이하의 숫자만 가능합니다.'
  })
  userPhone: string;

  @prop({
    required: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    message: '이메일 형식에 맞춰 입력해 주세요.'
  })
  userEmail: string;

  @prop({
    required: true,
    match: /^[a-zA-Z0-9]{42}$/,
    message: '올바른 공개 주소를 입력해 주세요.'
  })
  userWalletAddress: string;

  @prop({ type: () => [Address] })
  addresses: Address[]

  @prop({
    required: true,
    // match: /^(Buyer|Seller)$/,
    message: 'Buyer || Seller 중 하나를 선택해 주세요.'
  })
  userAccountType: string;

  @prop({
    required: false,
    default: '1' // 1 == 활동중, 0 == 활동정지
  })
  userStatus: string;

  @prop({ default: () => new Date() })
  createdDate: Date;

  @prop({ default: () => new Date() })
  updatedDate: Date;

  @prop()
  deletedDate: Date;

}

/**
 * 유효성 검사
 */
function addressRequired(address: Address[]): boolean {
  return address && address.length > 0
}