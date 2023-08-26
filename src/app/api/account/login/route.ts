import { apiHandler } from '@/app/_helpers/server/api'
import { cookies } from 'next/headers'
import joi from 'joi'
import { userService } from '@/app/_helpers/server/_service/userService'

module.exports = apiHandler({
  POST: login,
})

async function login(req: Request) {
  const body = await req.json()
  const { user, token } = await userService.authenticate(body)

  // return jwt token in http only cookie
  cookies().set('authorization', token, { httpOnly: true })

  return user._id
}

login.schema = joi.object({
  userWalletAddress: joi.string().required(),
  user_password: joi.string().required(),
})
