import { NextRequest } from 'next/server'
import { subscribe, unsubscribe } from '@/lib/store'

export const runtime = 'edge';
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const id = Math.random().toString(36).slice(2)

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder()
      // Send initial ping
      controller.enqueue(encoder.encode('event: connected\ndata: {"status":"ok"}\n\n'))
      
      subscribe(id, (msg: string) => {
        try { controller.enqueue(encoder.encode(msg)) } catch {}
      })
    },
    cancel() {
      unsubscribe(id)
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    }
  })
}
