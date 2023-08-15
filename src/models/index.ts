import { getModelForClass } from '@typegoose/typegoose'
import { Store } from '@/models/Store'
import { User } from '@/models/user/User'
import { Address } from '@/models/common/Address'

export const UserModel = getModelForClass(User)

export const AddressModel = getModelForClass(Address)

export const StoreModel = getModelForClass(Store)
