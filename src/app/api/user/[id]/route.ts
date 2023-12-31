import { apiHandler } from '@/app/_helpers/server/api'
import { cookies } from 'next/headers'
import joi from 'joi'
import { userService } from '@/app/_helpers/server/_service/account/UserService'
import { ParamsInputId } from '@/variables/interface/api/params-input-interface'

async function getById(_req: Request, { params }: ParamsInputId) {
  return userService.getUserById(params.id)
}

async function updateUser(req: Request, { params }: ParamsInputId) {
  return userService.updateUserById(params.id, await req.json())
}

updateUser.schema = joi.object({
  userName: joi.string().required(),
  userPhone: joi
    .string()
    // 9 ~ 11자리 숫자
    .pattern(/^[0-9]{9,11}$/)
    .required(),
  userEmail: joi.string().email().required(),
  userAccountType: joi.string().required(),
})

async function _delete(req: Request, { params }: ParamsInputId) {
  // auto logout and soft delete if deleted self
  if (params.id === req.headers.get('userId')) {
    cookies().delete('authorization')
    return userService.softDeleteUserById(params.id)
  }

  throw 'Not match login User and params'

  // hard delete if manager try deleted
  // return userService._delete(params.id)
}

module.exports = apiHandler({
  GET: getById,
  PUT: updateUser,
  DELETE: _delete,
})
