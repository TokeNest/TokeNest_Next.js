import { apiHandler } from '@/app/_helpers/server/api'
import { ParamsInputId } from '@/variables/interface/api/params-input-interface'
import { productOptionService } from '@/app/_helpers/server/_service/store/productOptionService'

function getProductOptions(_req: Request, { params }: ParamsInputId) {
  return productOptionService.getProductOptionsByProductOptionGroupId(params.id)
}

module.exports = apiHandler({
  GET: getProductOptions,
})
