export interface TokenInfo {
  tokenType: string
  tokenAddress: string
  tokenDecimals: number
}

export interface TokenInfoCreate extends TokenInfo {
  save(): any
}

export interface TokenInfoDelete extends TokenInfoCreate {
  deletedDate: Date
}

export interface TokenInfoClient extends TokenInfo {
  id: string
}
