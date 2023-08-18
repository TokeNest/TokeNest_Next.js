import { apiHandler } from '@/app/_helpers/server/api'
import { userRepository } from '@/app/_helpers/server/_repository'

module.exports = apiHandler({
  GET: getCurrent
})

async function getCurrent() {
  return await userRepository.getCurrent()
}