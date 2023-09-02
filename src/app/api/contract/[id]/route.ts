import { apiHandler } from '@/app/_helpers/server/api'
import { ParamsInputId } from '@/variables/interface/api/params-input-interface'
import { contractService } from '@/app/_helpers/server/_service/contract/ContractService'

async function getById(_req: Request, { params }: ParamsInputId) {
  return contractService.getContractById(params.id)
}

async function _delete(_req: Request, { params }: ParamsInputId) {
  return contractService.softDeleteContractById(params.id)
}

module.exports = apiHandler({
  GET: getById,
  DELETE: _delete,
})
