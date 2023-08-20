import { mockProductData } from '@/variables/mock/kiosk-api-mock'
import { Request } from 'next/dist/compiled/@edge-runtime/primitives'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  return NextResponse.json({ data: mockProductData })
}

export async function POST() {
  return NextResponse.json({ message: 'message from api' })
}
