import { NextRequest } from 'next/server'
import { auth } from '@/app/_helpers/server'

export { jwtMiddleware }

async function jwtMiddleware(req: NextRequest) {
  if (isPublicPath(req)) {
    return
  }

  const id = auth.verifyToken()
  req.headers.set('user_id', id)
}

function isPublicPath(req: NextRequest) {
  const publicPaths = [
    'POST:/api/account/login',
    'POST:/api/account/logout',
    'POST:/api/account/register',
    'POST:/api/store',
    'GET:/api/store',
    'POST:/api/store',
    'GET:/api/store',
  ]
  const path = `${req.method}:${req.nextUrl.pathname}`
  return publicPaths.includes(path) || checkPathWithParams(path)
}

function checkPathWithParams(path: string) {
  let isPathHasParam: boolean = false
  const pathsWithParam = [
    'GET:/api/store/',
    'PUT:/api/store/',
    'DELETE:/api/store/',
    'GET:/api/store/',
    'PUT:/api/store/',
    'POST:/api/store/',
    'DELETE:/api/store/',
    'GET:/api/kiosk/',
    'GET:/api/file',
  ]
  pathsWithParam.forEach((pathWithParam) => {
    if (path.includes(pathWithParam)) {
      isPathHasParam = true
    }
  })
  return isPathHasParam
}
