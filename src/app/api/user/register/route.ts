import joi from 'joi'

import { apiHandler } from '@/app/_helpers/server/api'
import { userService } from '@/app/_helpers/server/_service/account/UserService'

const register = async function (req: Request) {
  return userService.createUser(await req.json())
}

register.schema = joi.object({
  userName: joi.string().required(),
  userPassword: joi
    .string()
    // 영문 대, 소문자와 숫자, 특수기호가 적어도 1개 이상 포함된 8 ~ 20자
    .pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{8,20}$/)
    .required(),
  userPhone: joi
    .string()
    // 9 ~ 11자리 숫자
    .pattern(/^[0-9]{9,11}$/)
    .required(),
  userEmail: joi.string().email().required(),
  userWalletAddress: joi
    .string()
    // 42개의 숫자와 문자
    .pattern(/^[a-zA-Z0-9]{42}$/)
    .required(),
  userAccountType: joi.string().required(),
})

module.exports = apiHandler({
  POST: register,
})
