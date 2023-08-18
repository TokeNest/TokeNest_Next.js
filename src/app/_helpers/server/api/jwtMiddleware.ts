import { NextRequest } from 'next/server'
import { auth } from '@/app/_helpers/server'

export { jwtMiddleware }

async function jwtMiddleware(req: NextRequest) {
  if (isPublicPath(req)) {
    return
  }

  const id = auth.verifyToken()
  req.headers.set('userId', id)
}

function isPublicPath(req: NextRequest) {
  const publicPaths = [
    'POST:/api/account/login',
    'POST:/api/account/logout',
    'POST:/api/account/register',
    'POST:/api/account/address',
    'GET:/api/users'
  ]
  return publicPaths.includes(`${req.method}:${req.nextUrl.pathname}`)
}
