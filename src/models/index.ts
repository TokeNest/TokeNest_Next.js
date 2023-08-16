import { getModelForClass } from '@typegoose/typegoose'
import { Store } from '@/models/store/Store'
import { User } from '@/models/user/User'
import { Product } from '@/models/product/Product'
import { ProductOptionGroup } from '@/models/product/ProductOptionGroup'
import { ProductOption } from '@/models/product/ProductOption'

export const UserModel = getModelForClass(User)
export const StoreModel = getModelForClass(Store)
export const ProductModel = getModelForClass(Product)
export const PrdOptGrpModel = getModelForClass(ProductOptionGroup)
export const PrdOptModel = getModelForClass(ProductOption)
