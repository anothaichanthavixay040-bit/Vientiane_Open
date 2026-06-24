import { NextRequest, NextResponse } from 'next/server'
import { matchResults, broadcast } from '@/lib/store'

export const runtime = 'edge';
export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(matchResults)
}

export async function PATCH(req: NextRequest) {
  const { id, redScore, blueScore, status, winner } = await req.json()
  const match = matchResults.find(m => m.id === id)
  if (!match) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  
  if (redScore !== undefined) match.redScore = redScore
  if (blueScore !== undefined) match.blueScore = blueScore
  if (status !== undefined) match.status = status
  if (winner !== undefined) match.winner = winner
  
  broadcast('result_update', match)
  return NextResponse.json(match)
}
