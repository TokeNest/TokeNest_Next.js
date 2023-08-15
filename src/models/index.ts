import { getModelForClass } from '@typegoose/typegoose'
import { UserResponseModel } from '@/dto/user/userResponseModel'
import { Store } from '@/models/Store'

export const UserModel = getModelForClass(UserResponseModel)
export const StoreModel = getModelForClass(Store)
