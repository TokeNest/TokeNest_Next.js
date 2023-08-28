import { NextRequest, NextResponse } from 'next/server'
import { errorHandler } from '@/app/_helpers/server/api/errorHandler'
import { validateMiddleware } from '@/app/_helpers/server/api/validateMiddleware'
import { jwtMiddleware } from '@/app/_helpers/server/api/jwtMiddleware'
import { apiResponses } from '@/utils/server/response/apiResponse'

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
        await jwtMiddleware(req)
        await validateMiddleware(req, handler[method].schema)
        const responseBody = await handler[method](req, ...args)

        // if api response try file download
        if (responseBody instanceof Response) {
          return responseBody
        }
        return NextResponse.json(apiResponses.apiExecuteSuccessWithBody(responseBody || {}))
      } catch (err: any) {
        return errorHandler({
          success: false,
          message: err,
          body: {},
        })
      }
    }
  })
  return wrappedHandler
}
