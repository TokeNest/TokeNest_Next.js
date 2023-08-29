import { apiHandler } from '@/app/_helpers/server/api'
import { storeService } from '@/app/_helpers/server/_service/store/StoreService'

module.exports = apiHandler({
  GET: getAll,
})

async function getAll() {
  return storeService.getStores()
}
