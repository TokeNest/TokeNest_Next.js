import { mockProductData } from '@/variables/kiosk-api-mock'
import { Request } from 'next/dist/compiled/@edge-runtime/primitives'
import { NextResponse } from 'next/server'

/**
 * @swagger
 * /api/kiosk:
 *   get:
 *     description: nice
 *     responses:
 *       200:
 *         description: nice 2 meet you
 */
export async function GET(request: Request) {
  return NextResponse.json({ data: mockProductData })
}

export async function POST() {
  return NextResponse.json({ message: 'message from api' })
}
