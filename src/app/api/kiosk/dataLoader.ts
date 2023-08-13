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
  return NextResponse.json({})
}
