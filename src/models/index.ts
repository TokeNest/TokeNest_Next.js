import { getModelForClass } from '@typegoose/typegoose'
import { User } from '@/models/User'
import { Store } from '@/models/Store'

export const UserModel = getModelForClass(User)
export const StoreModel = getModelForClass(Store)
