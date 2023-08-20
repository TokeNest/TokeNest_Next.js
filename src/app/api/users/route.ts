import { apiHandler } from '@/app/_helpers/server/api'
import { userRepository } from '@/app/_helpers/server/_repository'

module.exports = apiHandler({
  GET: getAll,
})

// address 잘 나오도록 매핑 필요.
async function getAll() {
  return await userRepository.getAll()
}