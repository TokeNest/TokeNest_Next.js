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
    'POST:/api/user/login',
    'POST:/api/user/logout',
    'POST:/api/user/register',
    'POST:/api/store',
    'GET:/api/store',
    'POST:/api/store',
    'GET:/api/store',
    'POST:/api/order',
    'GET:/api/order',
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
    'GET:/api/file/',
    'GET:/api/product/store/',
    'GET:/api/product/',
    'GET:/api/order/',
    'PUT:/api/order/',
  ]
  pathsWithParam.forEach((pathWithParam) => {
    if (path.includes(pathWithParam)) {
      isPathHasParam = true
    }
  })
  return isPathHasParam
}
