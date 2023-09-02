import { apiHandler } from '@/app/_helpers/server/api'
import { ParamsInputAddress } from '@/variables/interface/api/params-input-interface'
import { contractService } from '@/app/_helpers/server/_service/contract/ContractService'

async function getByAddress(_req: Request, { params }: ParamsInputAddress) {
  return contractService.getContractByAddress(params.address)
}

module.exports = apiHandler({
  GET: getByAddress,
})
