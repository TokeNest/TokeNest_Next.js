import { NextRequest, NextResponse } from 'next/server'
import { jwtMiddleware } from '@/app/_helpers/server/api/jwtMiddleware'
import { errorHandler } from '@/app/_helpers/server/api/errorHandler'

export { apiHandler }

function apiHandler(handler: any) {
  const wrappedHandler: any = {}
  const httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

  httpMethods.forEach((method) => {
    if (typeof handler[method] !== 'function') {
      return
    }
    wrappedHandler[method] = async (req: NextRequest, ...args: any) => {
      try {
        const json = await req.json()
        req.json = () => json
      } catch {}

      try {
        await jwtMiddleware(req)
        await validateMiddleware(req, handler[method].schema)

        const responseBody = await handler[method](req, ...args)
        return NextResponse.json(responseBody || {})
      } catch (err: any) {
        return errorHandler(err)
      }
    }
  })
}
