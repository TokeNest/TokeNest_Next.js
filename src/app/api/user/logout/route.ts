import { apiHandler } from '@/app/_helpers/server/api'
import { cookies } from 'next/headers'

const logout = async function () {
  cookies().delete('authorization')
  return true
}

module.exports = apiHandler({
  POST: logout,
})
