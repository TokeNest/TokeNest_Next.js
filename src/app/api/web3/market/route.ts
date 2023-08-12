import { Request } from 'next/dist/compiled/@edge-runtime/primitives'
import { NextResponse } from 'next/server'
import { mockDefaultMarketList } from '@/variables/mock/web3-api-mock'

export async function GET(request: Request) {
  return NextResponse.json({ data: mockDefaultMarketList })
}
