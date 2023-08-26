import { apiHandler } from '@/app/_helpers/server/api'
import { userRepository } from '@/app/_helpers/server/_repository'
import { cookies } from 'next/headers'
import joi from 'joi'
import { userService } from '@/app/_helpers/server/_service/userService'
import { ParamsInputId } from '@/variables/interface/api/paramsInput'

module.exports = apiHandler({
  GET: getById,
  PUT: updateUser,
  DELETE: _delete,
})

async function getById(_req: Request, { params }: ParamsInputId) {
  return await userService.getUserById(params.id)
}

async function updateUser(req: Request, { params }: ParamsInputId) {
  return await userService.update(params.id, await req.json())
}

updateUser.schema = joi.object({
  user_name: joi.string().required(),
  user_password: joi
    .string()
    // 영문 대, 소문자와 숫자, 특수기호가 적어도 1개 이상 포함된 8 ~ 20자
    .pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{8,20}$/)
    .required(),
  user_phone: joi
    .string()
    // 9 ~ 11자리 숫자
    .pattern(/^[0-9]{9,11}$/)
    .required(),
  user_email: joi.string().email().required(),
  user_account_type: joi.string().required(),
})

async function _delete(req: Request, { params }: ParamsInputId) {
  // auto logout and soft delete if deleted self
  if (params.id === req.headers.get('user_id')) {
    cookies().delete('authorization')
    await userService.softDelete(params.id)
    return { deleteSelf: true }
  }

  // hard delete if manager try deleted
  await userRepository.delete(params.id)
  return { manager: true }
}
