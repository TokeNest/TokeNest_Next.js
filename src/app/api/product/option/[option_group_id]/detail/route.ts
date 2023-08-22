import { apiHandler } from '@/app/_helpers/server/api'
import { prdOptRepository } from '@/app/_helpers/server/_repository'

module.exports = apiHandler({
  GET: getAll,
})

async function getAll(req: Request, { params: { option_group_id } }: any) {
  return await prdOptRepository.getAllByGroupId(option_group_id)
}
