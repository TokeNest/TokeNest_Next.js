import { apiHandler } from '@/app/_helpers/server/api'
import { userService } from '@/app/_helpers/server/_service/account/userService'

module.exports = apiHandler({
  GET: getCurrent,
})

async function getCurrent() {
  return userService.getCurrentUser()
}
