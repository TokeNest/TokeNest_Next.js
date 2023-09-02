import { tokenRepository } from '@/app/_helpers/server/_repository/contract/TokenRepository'
import { TokenInfo } from '@/variables/interface/api/token-interface'

const createToken = async (tokenInfo: TokenInfo) =>
  (await tokenRepository.getByAddress(tokenInfo.tokenAddress))
    ? Promise.reject('contract already exist.')
    : tokenRepository.create(tokenInfo)

const getTokens = async () => {
  const tokens = await tokenRepository.getAll()
  return tokens.length ? tokens : Promise.reject('contract not found')
}

const getTokenById = async (id: string) => {
  const token = await tokenRepository.getById(id)
  return token ? token : Promise.reject('contract not found')
}

const getTokenByAddress = async (address: string) => {
  const token = await tokenRepository.getByAddress(address)
  return token ? token : Promise.reject('contract not found')
}

const softDeleteTokenById = async (id: string) =>
  (await tokenRepository.getById(id))
    ? tokenRepository.softDelete(id)
    : Promise.reject('contract not found')

export const tokenService = {
  createToken,
  getTokens,
  getTokenById,
  getTokenByAddress,
  softDeleteTokenById,
}
