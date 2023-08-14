import { mockProductData } from '@/variables/kiosk-api-mock'
import { Request } from 'next/dist/compiled/@edge-runtime/primitives'
import { NextResponse } from 'next/server'

/**
 * @swagger
 * tags:
 *  name: Kiosks
 *  description: 상품 리스트 추가, 수정, 삭제, 조회
 *
 */

/**
 * @swagger
 * /api/kiosk:
 *   get:
 *    tags:
 *      - 'Kiosks'
 *    summary: '특정 매장의 상품 리스트 반환'
 *    description: nice
 *    responses:
 *      200:
 *        description: 상품 리스트 반환
 */
export async function GET(request: Request) {
  return NextResponse.json({ data: mockProductData })
  // parameters:
  //     - in: path
  // name: store_id
  // required: true
  // description: 매장 ID
  // schema:
  //     type: number
}

/**
 *@swagger
 * /api/kiosk:
 *  post:
 *    tags:
 *      - 'Kiosks'
 *    description: POST TEST
 *    response:
 *      200:
 *        description: TEST COMPLETE
 */
export async function POST() {
  return NextResponse.json({ message: 'message from api' })
}
