import { apiHandler } from '@/app/_helpers/server/api'
import { cookies } from 'next/headers'

module.exports = apiHandler({
  POST: logout,
})

async function logout() {
  cookies().delete('authorization')
  return true
}
