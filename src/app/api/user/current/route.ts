import { apiHandler } from '@/app/_helpers/server/api'
import { userService } from '@/app/_helpers/server/_service/account/UserService'

module.exports = apiHandler({
  GET: getCurrent,
})

async function getCurrent() {
  return userService.getCurrentUser()
}
