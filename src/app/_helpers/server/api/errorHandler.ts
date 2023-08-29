import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import ApiExecuteResult from '@/variables/interface/api/apiResponseInterface'

export { errorHandler }

function errorHandler(err: ApiExecuteResult) {
  if (typeof err.message === 'string') {
    const status = err.message.toLowerCase().includes('not found') ? 404 : 400
    return NextResponse.json(err, { status })
  }

  if (err.message.name === 'JsonWebTokenError') {
    cookies().delete('authorization')
    return NextResponse.json({ success: err.success, message: 'Unauthorized' }, { status: 401 })
  }

  console.error(err)
  return NextResponse.json(
    { success: err.success, message: err.message.message, body: err.body },
    { status: 500 }
  )
}
