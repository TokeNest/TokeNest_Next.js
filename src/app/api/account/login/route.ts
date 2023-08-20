import { apiHandler } from '@/app/_helpers/server/api'
import { userRepository } from '@/app/_helpers/server/_repository'
import { cookies } from 'next/headers'
import joi from 'joi'

module.exports = apiHandler({
  POST: login,
})

async function login(req: Request) {
  const body = await req.json()
  const { user, token } = await userRepository.authenticate(body)

  // return jwt token in http only cookie
  cookies().set('authorization', token, { httpOnly: true })

  return user

}

login.schema = joi.object({
  user_wallet_address: joi.string().required(),
  user_password: joi.string().required(),
})
