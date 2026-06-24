import { NextResponse } from 'next/server'
import { athletes } from '@/lib/store'

export const runtime = 'edge';
export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(athletes)
}
