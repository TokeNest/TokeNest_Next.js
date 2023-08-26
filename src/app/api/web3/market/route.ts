import { NextResponse } from 'next/server'
import { mockDefaultMarketList } from '@/variables/mock/web3-api-mock'

export async function GET() {
  return NextResponse.json({ data: mockDefaultMarketList })
}
