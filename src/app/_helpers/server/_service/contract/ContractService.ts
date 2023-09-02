import { contractRepository } from '@/app/_helpers/server/_repository/contract/ContractRepository'
import { ContractInfo } from '@/variables/interface/api/contract-interface'

const createContract = async (contractInfo: ContractInfo) =>
  (await contractRepository.getByAddress(contractInfo.contractAddress))
    ? Promise.reject('contract already exist')
    : contractRepository.create(contractInfo)

const getContracts = async () => {
  const contracts = await contractRepository.getAll()
  return contracts.length ? contracts : Promise.reject('contract not found')
}

const getContractByAddress = async (address: string) => {
  const contract = await contractRepository.getByAddress(address)
  return contract ? contract : Promise.reject('contract not found')
}

const getContractById = async (id: string) => {
  const contract = await contractRepository.getById(id)
  return contract ? contract : Promise.reject('contract not found')
}

const softDeleteContractById = async (id: string) =>
  (await contractRepository.getById(id))
    ? contractRepository.softDelete(id)
    : Promise.reject('contract not found')

export const contractService = {
  createContract,
  getContracts,
  getContractById,
  getContractByAddress,
  softDeleteContractById,
}
