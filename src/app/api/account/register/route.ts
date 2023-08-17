import { userRepository } from '_helpers/server'
import { apiHandler } from '_helpers/server/api'

module.exports = apiHandler({
  POST: register,
})

async function register(req: Request) {
  const body = await req.json()
  await userRepository.create(body)
}
