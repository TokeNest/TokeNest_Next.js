import { apiHandler } from '@/app/_helpers/server/api'

module.exports = apiHandler({
  POST: createOrder,
})

export async function createOrder(req: Request) {}
