import {
  TokenInfo,
  TokenInfoClient,
  TokenInfoDelete,
} from '@/variables/interface/api/token-interface'
import { db } from '@/app/_helpers/server'

const Token = db.Token

const create = async (tokenInfo: TokenInfo): Promise<string> =>
  (await new Token(tokenInfo).save())._id

const getAll = async (): Promise<TokenInfoClient[]> => Token.find({ deletedDate: null }).exec()

const getById = async (id: string): Promise<TokenInfoClient> =>
  Token.findOne({ _id: id, deletedDate: null }).exec()

const getByAddress = async (tokenAddress: string): Promise<TokenInfoClient> =>
  Token.findOne({ tokenAddress, deletedDate: null }).exec()

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
