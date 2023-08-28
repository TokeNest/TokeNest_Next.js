import { apiHandler } from '@/app/_helpers/server/api'
import { userService } from '@/app/_helpers/server/_service/account/userService'

module.exports = apiHandler({
  GET: getAll,
})

async function getAll() {
  return userService.getUsers()
}
