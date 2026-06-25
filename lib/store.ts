// Lightweight in-process pub/sub used by the SSE stream (/api/stream).
// Data itself now lives in Supabase — see lib/supabase.ts.
//
// NOTE: this broadcast only reaches clients connected to the SAME server
// instance. It works in local dev and a single Node server. On Cloudflare
// Pages (multiple edge isolates) cross-client live updates should use
// Supabase Realtime instead — see README.

const subscribers: Map<string, (data: string) => void> = new Map()

export function subscribe(id: string, cb: (data: string) => void) {
  subscribers.set(id, cb)
}
export function unsubscribe(id: string) {
  subscribers.delete(id)
}
export function broadcast(event: string, data: unknown) {
  const msg = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
  subscribers.forEach(cb => cb(msg))
}
