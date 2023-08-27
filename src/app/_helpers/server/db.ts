import mongoose from 'mongoose'
import * as process from 'process'

const Schema = mongoose.Schema

mongoose.connect(process.env.mongodbUrl!)
mongoose.Promise = global.Promise

const fileModel = () => {
  const fileSchema = new Schema(
    {
      fileName: { type: String, required: true },
      fileType: { type: String, required: true },
      fileCapacity: { type: String, require: true },
      filePath: { type: String, required: true },
    },
    {
      timestamps: {
        createdAt: 'created_date',
      },
    }
  )
  return mongoose.models.File || mongoose.model('File', fileSchema)
}

const addressModel = () => {
  const addressSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      addressName: { type: String, required: true },
      roadAddress: { type: String, required: true },
      addressDetail: { type: String, required: true },
      deletedDate: { type: Date, default: null },
    },
    {
      timestamps: {
        createdAt: 'createdDate',
        updatedAt: 'updatedDate',
      },
    }
  )

  addressSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (_, ret) {
      delete ret._id
      delete ret.hash
    },
  })

  return mongoose.models.Address || mongoose.model('Address', addressSchema)
}

const userModel = () => {
  const userSchema = new Schema(
    {
      userName: { type: String, required: true },
      userPasswordHash: { type: String, required: true },
      userPhone: { type: String, required: true },
      userEmail: { type: String, required: true },
      userWalletAddress: { type: String, unique: true, required: true },
      addresses: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Address',
        },
      ],
      userAccountType: { type: String, required: true },
      deletedDate: { type: Date, default: null },
    },
    {
      timestamps: {
        createdAt: 'createdDate',
        updatedAt: 'updatedDate',
      },
    }
  )

  userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (_, ret) {
      delete ret._id
      delete ret.hash
    },
  })

  return mongoose.models.User || mongoose.model('User', userSchema)
}

const productModel = () => {
  const schema = new Schema(
    {
      productName: { type: String, required: true },
      productInfo: { type: String, required: true },
      productStatus: { type: String, required: true },
      productIntro: { type: String, required: true },
      productPrice: { type: Number, required: true },
      productCategory: { type: String, required: true },
      deletedDate: { type: Date, default: null },
      store: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: true,
      },
      optionGroups: [
        {
          type: Schema.Types.ObjectId,
          ref: 'ProductOptionGroup',
        },
      ],
      file: {
        type: Schema.Types.ObjectId,
        ref: 'File',
        default: null,
      },
    },
    {
      timestamps: {
        createdAt: 'createdDate',
        updatedAt: 'updatedDate',
      },
    }
  )

  // schema.set('timestamps', {
  //   createdAt: 'createdDate',
  //   updatedAt: 'updatedDate',
  // })

  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (_, ret) {
      delete ret._id
      delete ret.hash
    },
  })

  return mongoose.models.Product || mongoose.model('Product', schema)
}

const productOptionGroupModel = () => {
  const schema = new Schema(
    {
      productOptionGroupName: { type: String, required: true },
      productOptionGroupType: { type: String, required: true },
      deletedDate: { type: Date, default: null },
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      options: [
        {
          type: Schema.Types.ObjectId,
          ref: 'ProductOption',
        },
      ],
    },
    {
      timestamps: {
        createdAt: 'createdDate',
        updatedAt: 'updatedDate',
      },
    }
  )

  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (_, ret) {
      delete ret._id
      delete ret.hash
    },
  })

  return mongoose.models.ProductOptionGroup || mongoose.model('ProductOptionGroup', schema)
}

const productOptionModel = () => {
  const schema = new Schema(
    {
      productOptionName: { type: String, required: true },
      productOptionIsDefault: { type: Boolean, required: true, default: false },
      productOptionInfo: { type: String },
      productOptionPrice: { type: Number, required: true, default: 0 },
      deletedDate: { type: Date, default: null },
      groupId: {
        type: Schema.Types.ObjectId,
        ref: 'ProductOptionGroup',
        required: true,
      },
    },
    {
      timestamps: {
        createdAt: 'createdDate',
        updatedAt: 'updatedDate',
      },
    }
  )

  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (_, ret) {
      delete ret._id
      delete ret.hash
    },
  })

  return mongoose.models.ProductOption || mongoose.model('ProductOption', schema)
}

const storeModel = () => {
  const schema = new Schema(
    {
      storeName: { type: String, required: true },
      storeTel: { type: String, required: true },
      storeEmail: { type: String, required: true },
      storeCategory: { type: String, required: true },
      storeOffDay: { type: String, required: true, default: '0000000' },
      storeOpenCloseTime: { type: String, required: true, default: '00:00-23:59' },
      storeStatus: { type: String, required: true },
      deletedDate: { type: Date, default: null },
    },
    {
      timestamps: {
        createdAt: 'createdDate',
        updatedAt: 'updatedDate',
      },
    }
  )

  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (_, ret) {
      delete ret._id
      delete ret.hash
    },
  })
  return mongoose.models.Store || mongoose.model('Store', schema)
}

export const db = {
  File: fileModel(),
  Product: productModel(),
  User: userModel(),
  Address: addressModel(),
  ProductOptionGroup: productOptionGroupModel(),
  ProductOption: productOptionModel(),
  Store: storeModel(),
}
