import { apiHandler } from '@/app/_helpers/server/api'
import { userRepository } from '@/app/_helpers/server/_repository'
import { cookies } from 'next/headers'

module.exports = apiHandler({
  GET: getById,
  PUT: update,
  DELETE: _delete,
})

async function getById(req: Request, { params: { id } }: any) {
  return await userRepository.getById(id)
}

async function update(req: Request, { params: { id } }: any) {
  const body = await req.json()
  await userRepository.update(id, body)
}

async function _delete(req: Request, { params: { id } }: any) {
  await userRepository.softDelete(id)

  // auto logout if deleted self
  if (id === req.headers.get('userWalletAddress')) {
    cookies().delete('authorization')
    return { deleteSelf: true }
  }
}