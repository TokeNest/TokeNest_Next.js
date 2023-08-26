import joi from 'joi'

import { apiHandler } from '@/app/_helpers/server/api'
import { userService } from '@/app/_helpers/server/_service/userService'

module.exports = apiHandler({
  POST: register,
})

async function register(req: Request) {
  return userService.join(await req.json())
}

register.schema = joi.object({
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
  userWalletAddress: joi
    .string()
    // 42개의 숫자와 문자
    .pattern(/^[a-zA-Z0-9]{42}$/)
    .required(),
  user_account_type: joi.string().required(),
})
