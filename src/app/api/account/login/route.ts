import { apiHandler } from '@/app/_helpers/server/api'
import { cookies } from 'next/headers'
import joi from 'joi'
import { userService } from '@/app/_helpers/server/_service/userService'

const login = async function (req: Request) {
  const { user, token } = await userService.authenticate(await req.json())
  // return jwt token in http only cookie
  cookies().set('authorization', token, { httpOnly: true })
  return user._id
}

login.schema = joi.object({
  userWalletAddress: joi.string().required(),
  user_password: joi.string().required(),
})

module.exports = apiHandler({
  POST: login,
})
