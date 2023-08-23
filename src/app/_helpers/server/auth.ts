import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export const auth = {
  isAuthenticated,
  verifyToken,
}

function isAuthenticated() {
  try {
    verifyToken()
    return true
  } catch {
    return false
  }
}

function verifyToken() {
  const token = cookies().get('authorization')?.value ?? ''
  const decoded = jwt.verify(token, process.env.jwtSecret!)
  return decoded.sub as string
}
