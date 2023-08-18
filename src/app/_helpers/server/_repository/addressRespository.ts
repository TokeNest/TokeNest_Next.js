import { db } from '@/app/_helpers/server'

const User = db.User
const Address = db.Address

export const addressRepository = {
  getByUserId,
  getById,
  create,
  update,
  delete: _delete,
}

async function getById(id: string) {
  try {
    return await Address.findById(id)
  } catch (e) {
    throw 'Address not found'
  }
}
async function getByUserId(userId: string) {
  try {
    const user = await User.findById(userId)
    return await Address.find().where({ user: user })
  } catch (e) {
    throw 'Address not found'
  }
}

async function create(user_id: string, params: any) {
  try {
    const user = new User(await User.findById(user_id))
    console.log(params)
    const address = new Address({ user: user, ...params })
    await address.save()

    // setting relationship
    user.addresses.push(address)
    await user.save()

  } catch (e) {
    throw 'Error with ' + e
  }

}

async function update(id: string, params: any) {
  try {
    const address = await getById(id)

    Object.assign(address, params)

    await address.save()

  } catch (e) {
    throw 'Error Update Address with ' + e
  }

}

async function _delete(id: string) {
    await Address.findByIdAndRemove(id)
}