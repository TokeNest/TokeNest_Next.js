import { apiHandler } from '@/app/_helpers/server/api'
import { userRepository } from '@/app/_helpers/server/_repository'
import { cookies } from 'next/headers'
import joi from 'joi'

module.exports = apiHandler({
  GET: getById,
  PUT: updateUser,
  DELETE: _delete,
})

async function getById(req: Request, { params: { id } }: any) {
  return await userRepository.getById(id)
}

async function updateUser(req: Request, { params: { id } }: any) {
  const body = await req.json()
  return await userRepository.update(id, body)
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

async function _delete(req: Request, { params: { id } }: any) {
  // auto logout and soft delete if deleted self
  if (id === req.headers.get('user_id')) {
    cookies().delete('authorization')
    await userRepository.softDelete(id)
    return { deleteSelf: true }
  }

  await userRepository.delete(id)
  return { manager: true }
}
