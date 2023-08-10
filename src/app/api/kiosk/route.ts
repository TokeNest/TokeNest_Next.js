import { mockProductData } from '@/variables/kiosk-api-mock'
import { Request } from 'next/dist/compiled/@edge-runtime/primitives'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  return NextResponse.json({ data: mockProductData })
}
