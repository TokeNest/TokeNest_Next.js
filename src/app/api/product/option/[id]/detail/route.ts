import { apiHandler } from '@/app/_helpers/server/api'
import { ParamsInputId } from '@/variables/interface/api/params-input-interface'
import { productOptionRepository } from '@/app/_helpers/server/_repository/store/ProductOptionRepository'

module.exports = apiHandler({
  GET: getAll,
})

function getAll(_req: Request, { params }: ParamsInputId) {
  return productOptionRepository.getAllByGroupId(params.id)
}
