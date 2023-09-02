import { apiHandler } from '@/app/_helpers/server/api'
import { contractService } from '@/app/_helpers/server/_service/contract/ContractService'
import joi from 'joi'

async function createContract(req: Request) {
  return contractService.createContract(await req.json())
}

createContract.schema = joi.object({
  contractType: joi.string().required(),
  contractAddress: joi.string().required(),
})

async function getAll(_req: Request) {
  return contractService.getContracts()
}

module.exports = apiHandler({
  POST: createContract,
  GET: getAll,
})
