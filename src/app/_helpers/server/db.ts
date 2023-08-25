import mongoose from 'mongoose'
import * as process from 'process'

const Schema = mongoose.Schema

mongoose.connect(process.env.mongodbUrl!)
mongoose.Promise = global.Promise

function fileModel() {
  const fileSchema = new Schema(
    {
      file_name: { type: String, required: true },
      file_type: { type: String, required: true },
      file_capacity: { type: String, require: true },
      file_path: { type: String, required: true },
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    },
    {
      timestamps: {
        createdAt: 'created_date',
      },
    }
  )
  return mongoose.models.File || mongoose.model('File', fileSchema)
}

function addressModel() {
  const addressSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      address_name: { type: String, required: true },
      road_address: { type: String, required: true },
      address_detail: { type: String, required: true },
      deleted_date: { type: Date, default: null },
    },
    {
      timestamps: {
        createdAt: 'created_date',
        updatedAt: 'updated_date',
      },
    }
  )

  addressSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id
      delete ret.hash
    },
  })

  return mongoose.models.Address || mongoose.model('Address', addressSchema)
}

function userModel() {
  const userSchema = new Schema(
    {
      user_name: { type: String, required: true },
      user_password_hash: { type: String, required: true },
      user_phone: { type: String, required: true },
      user_email: { type: String, required: true },
      user_wallet_address: { type: String, unique: true, required: true },
      addresses: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Address',
        },
      ],
      user_account_type: { type: String, required: true },
      deleted_date: { type: Date, default: null },
    },
    {
      timestamps: {
        createdAt: 'created_date',
        updatedAt: 'updated_date',
      },
    }
  )

  userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id
      delete ret.hash
    },
  })

  return mongoose.models.User || mongoose.model('User', userSchema)
}

function productModel() {
  const schema = new Schema(
    {
      product_name: { type: String, required: true },
      product_info: { type: String, required: true },
      product_status: { type: String, required: true },
      product_intro: { type: String, required: true },
      product_price: { type: Number, required: true },
      product_category: { type: String, required: true },
      deleted_date: { type: Date, default: null },
      store_id: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: true,
      },
      option_groups: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Product_Option_Group',
        },
      ],
      file: {
        type: Schema.Types.ObjectId,
        ref: 'File',
      },
    },
    {
      timestamps: {
        createdAt: 'created_date',
        updatedAt: 'updated_date',
      },
    }
  )

  // schema.set('timestamps', {
  //   createdAt: 'created_date',
  //   updatedAt: 'updated_date',
  // })

  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id
      delete ret.hash
    },
  })

  return mongoose.models.Product || mongoose.model('Product', schema)
}

function productOptionGroupModel() {
  const schema = new Schema(
    {
      product_option_group_name: { type: String, required: true },
      product_option_group_is_require: { type: Boolean, required: true, default: false },
      product_option_group_is_duplicate: { type: Boolean, required: true, default: false },
      deleted_date: { type: Date, default: null },
      product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      options: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Product_Option',
        },
      ],
    },
    {
      timestamps: {
        createdAt: 'created_date',
        updatedAt: 'updated_date',
      },
    }
  )

  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id
      delete ret.hash
    },
  })

  return mongoose.models.Product_Option_Group || mongoose.model('Product_Option_Group', schema)
}

function productOptionModel() {
  const schema = new Schema(
    {
      product_option_name: { type: String, required: true },
      product_option_is_default: { type: Boolean, required: true, default: false },
      product_option_price: { type: Number, required: true },
      deleted_date: { type: Date, default: null },
      group_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product_Option_Group',
        required: true,
      },
    },
    {
      timestamps: {
        createdAt: 'created_date',
        updatedAt: 'updated_date',
      },
    }
  )

  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id
      delete ret.hash
    },
  })

  return mongoose.models.Product_Option || mongoose.model('Product_Option', schema)
}

function storeModel() {
  const schema = new Schema(
    {
      store_name: { type: String, required: true },
      store_tel: { type: String, required: true },
      store_email: { type: String, required: true },
      store_category: { type: String, required: true },
      store_off_day: { type: String, required: true, default: '0000000' },
      store_open_close_time: { type: String, required: true, default: '00:00-23:59' },
      store_status: { type: String, required: true },
      deleted_date: { type: Date, default: null },
    },
    {
      timestamps: {
        createdAt: 'created_date',
        updatedAt: 'updated_date',
      },
    }
  )

  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
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
  Product_Option_Group: productOptionGroupModel(),
  Product_Option: productOptionModel(),
  Store: storeModel(),
}
