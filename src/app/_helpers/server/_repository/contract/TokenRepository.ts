import {
  TokenInfo,
  TokenInfoClient,
  TokenInfoDelete,
} from '@/variables/interface/api/token-interface'
import { db } from '@/app/_helpers/server'
import { tokenProjection } from '@/variables/projection/projection'

const Token = db.Token

const create = async (tokenInfo: TokenInfo): Promise<string> =>
  (await new Token(tokenInfo).save())._id

const getAll = async (): Promise<TokenInfoClient[]> =>
  Token.find({ deletedDate: null }, tokenProjection).exec()

const getById = async (id: string): Promise<TokenInfoClient> =>
  Token.findOne({ _id: id, deletedDate: null }, tokenProjection).exec()

const getByAddress = async (tokenAddress: string): Promise<TokenInfoClient> =>
  Token.findOne({ tokenAddress, deletedDate: null }, tokenProjection).exec()

const softDelete = async (id: string): Promise<string> => {
  const token: TokenInfoDelete = await Token.findOne({ _id: id, deletedDate: null }).exec()
  token.deletedDate = new Date()
  return (await token.save())._id
}

export const tokenRepository = {
  create,
  getAll,
  getById,
  getByAddress,
  softDelete,
}
