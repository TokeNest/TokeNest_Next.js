import { apiHandler } from '@/app/_helpers/server/api'
import { userRepository } from '@/app/_helpers/server/_repository'

module.exports = apiHandler({
  POST: register,
})

async function register(req: Request) {
  const body = await req.json()
  await userRepository.create(body)
}
