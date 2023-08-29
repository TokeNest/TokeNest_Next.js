export interface TokenInfo {
  tokenSymbol: string
  tokenAddress: string
}

export interface TokenInfoSave extends TokenInfo {
  save(): any
}

export interface TokenInfoDelete extends TokenInfoSave {
  deletedDate: Date
}

export interface TokenInfoClient extends TokenInfo {
  id: string
}
