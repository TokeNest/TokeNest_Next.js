import { apiHandler } from '@/app/_helpers/server/api'
import { ParamsInputId } from '@/variables/interface/api/paramsInput'
import { userService } from '@/app/_helpers/server/_service/account/userService'
import joi from 'joi'

async function updatePassword(req: Request, { params }: ParamsInputId) {
  return userService.updateUserPasswordById(params.id, (await req.json()).userPassword)
}

updatePassword.schema = joi.object({
  userPassword: joi
    .string()
    // 영문 대, 소문자와 숫자, 특수기호가 적어도 1개 이상 포함된 8 ~ 20자
    .pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{8,20}$/)
    .required(),
})

module.exports = apiHandler({
  PUT: updatePassword,
})
