# 🥋 Vientiane Karate Federation — Next.js Website

A full-featured Next.js 14 website for the Vientiane Open Karate Championship 2026.

## Features

- **🏠 Homepage** — Hero, event spotlight, registration links, real-time feature highlights
- **📖 About** — VKF mission, values, and pillars
- **📅 Events** — Full event details, categories, schedule, hotel info
- **⚡ Real-Time Check-In** — QR code scanner + manual entry, live feed via SSE
- **🏆 Live Results** — Match scores updating in real-time across all connected devices
- **🛠 Admin Panel** — Update scores, match status, winners (at `/admin`)
- **📞 Contact** — All contact info + registration links

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Server-Sent Events (SSE)** for real-time updates
- **Google Forms** integration for registration

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Real-Time Architecture

```
Admin updates score → PATCH /api/results
                    ↓
              In-memory store broadcasts via SSE
                    ↓
        All connected clients receive update instantly
        (Results page, Check-In page)
```

## Database (Supabase)

Athletes, matches and check-ins are stored in **Supabase** (PostgreSQL).

### Setup
1. **Create the tables + seed data** — open your Supabase project → **SQL Editor** → New query → paste the contents of [`supabase/schema.sql`](supabase/schema.sql) → **Run**.
2. **Add your keys** — copy `.env.example` to `.env.local` and fill in:
   ```
   SUPABASE_URL=https://kqkikfndytdzrfnearkd.supabase.co
   SUPABASE_SECRET_KEY=sb_secret_...   (Project Settings → API Keys → Secret key)
   ```
   The **Secret key** (`sb_secret_…`) is privileged — it stays server-side and is never sent to the
   browser. The publishable key is *not* used. (Legacy `service_role` keys also still work.)
3. **Restart** `npm run dev`.
4. For the live site, add the same two variables in **Cloudflare Pages → Settings → Environment variables**, then redeploy.

### CRUD API (`/api/results`, `/api/athletes`)
| Method | Action |
|--------|--------|
| `GET`    | list |
| `POST`   | create |
| `PATCH`  | update (by `id`) |
| `DELETE` | remove (`?id=` or `{ id }`) |

Manage matches at **`/admin`** (create, edit, score, set winner, delete). Writes go through the
server-side service-role key; the public can only read (enforced by Row Level Security).

> **Live updates:** the SSE stream (`/api/stream`) broadcasts within a single server instance
> (works in local dev). On Cloudflare's multi-isolate edge, swap it for **Supabase Realtime**
> to sync live scores across all visitors.

## Admin Panel

Visit `/admin` to manage match scores in real-time.
All updates broadcast instantly via SSE to the `/results` page.

## Registration Links (Google Forms)

| Form | Link |
|------|------|
| Team Register | https://forms.gle/HjJ7qCe2ooNUHdSm9 |
| Athlete Register | https://forms.gle/vevCSWHsHTQr8gfz6 |
| Team Officials | https://forms.gle/qCAfm3iokE6q38NJA |
| Referee Register | https://forms.gle/MFmXHnZQ1csU1eo1A |
| Hotel Booking | https://forms.gle/WsJrt5LViMisrEZG8 |

## Project Structure

```
vkf-website/
├── app/
│   ├── page.tsx          # Homepage
│   ├── about/page.tsx    # About VKF
│   ├── events/page.tsx   # Events & Registration
│   ├── checkin/page.tsx  # Real-time Check-In
│   ├── results/page.tsx  # Live Results
│   ├── admin/page.tsx    # Score Management
│   ├── contact/page.tsx  # Contact
│   └── api/
│       ├── stream/       # SSE endpoint
│       ├── athletes/     # Athlete data
│       ├── checkin/      # Check-in endpoint
│       └── results/      # Match results
├── components/
│   └── layout/           # Navbar, Footer
├── lib/
│   ├── store.ts          # In-memory real-time store
│   └── categories.ts     # Competition categories
└── types/index.ts        # TypeScript types
```
