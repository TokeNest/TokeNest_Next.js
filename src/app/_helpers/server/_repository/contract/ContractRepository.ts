import { db } from '@/app/_helpers/server'
import {
  ContractInfo,
  ContractInfoClient,
  ContractInfoDelete,
} from '@/variables/interface/api/contract-interface'
import { contractProjection } from '@/variables/projection/projection'

const Contract = db.Contract

const create = async (contractInfo: ContractInfo): Promise<String> =>
  (await new Contract(contractInfo).save())._id

const getAll = async (): Promise<ContractInfoClient[]> =>
  Contract.find({ deletedDate: null }, contractProjection).exec()

const getById = async (id: string): Promise<ContractInfoClient> =>
  Contract.findOne({ _id: id, deletedDate: null }, contractProjection).exec()

const getByAddress = async (contractAddress: string): Promise<ContractInfoClient> =>
  Contract.findOne({ contractAddress, deletedDate: null }, contractProjection).exec()

const softDelete = async (id: string): Promise<string> => {
  const contract: ContractInfoDelete = await Contract.findOne({ _id: id, deletedDate: null }).exec()
  contract.deletedDate = new Date()
  return (await contract.save!())._id
}

export const contractRepository = {
  create,
  getAll,
  getById,
  getByAddress,
  softDelete,
}
