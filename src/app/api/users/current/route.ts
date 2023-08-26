import { apiHandler } from '@/app/_helpers/server/api'
import { userService } from '@/app/_helpers/server/_service/userService'

module.exports = apiHandler({
  GET: getCurrent,
})

async function getCurrent() {
  return await userService.getCurrentUser()
}
