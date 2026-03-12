import type { Metadata, Viewport } from 'next' // เพิ่ม Viewport เข้ามา
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// 1. เพิ่มการตั้งค่า viewport ตรงนี้
export const viewport: Viewport = {
  themeColor: '#C8102E',
}

export const metadata: Metadata = {
  // 2. เพิ่ม metadataBase (ใช้ URL ของเว็บจริงของคุณ)
  metadataBase: new URL('https://www.vientianekarate.com'), 
  
  title: 'Vientiane Karate Federation',
  description: 'Official website of the Vientiane Karate Federation — Vientiane Open Karate Championship 2026',
  keywords: 'karate , vientiane open, laos, championship, VKF',
  // ... ส่วนที่เหลือของคุณเหมือนเดิม ...
  openGraph: {
    title: 'Vientiane Karate Federation',
    description: 'Vientiane Open Karate Championship 2026 — 16-17 May, Vientiane Center Mall',
    images: ['/android-chrome-512x512.png'],
    locale: 'en_US',
    type: 'website',
  },
  // ลบ themeColor ออกจากตรงนี้ได้เลยครับ
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#C8102E" />
        <meta name="msapplication-TileColor" content="#C8102E" />
        <meta name="msapplication-TileImage" content="/android-chrome-192x192.png" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
