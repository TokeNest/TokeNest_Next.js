export interface ContractInfo {
  contractType: string
  contractAddress: string
}

export interface ContractInfoCreate extends ContractInfo {
  save?(): any
}

export interface ContractInfoDelete extends ContractInfoCreate {
  deletedDate: Date
}

export interface ContractInfoClient extends ContractInfo {
  id: string
}
