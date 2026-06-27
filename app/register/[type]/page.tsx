import { notFound } from 'next/navigation'
import { REG_TYPES, REG_TYPE_KEYS } from '@/lib/registrationTypes'
import RegisterTypeForm from './RegisterTypeForm'

// Pre-render the 4 known types as static pages; unknown types 404.
// (Keeps these routes static so no Edge runtime is required on Cloudflare.)
export const dynamicParams = false
export function generateStaticParams() {
  return REG_TYPE_KEYS.map(type => ({ type }))
}

export default async function RegisterTypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params
  if (!REG_TYPES[type]) notFound()
  return <RegisterTypeForm type={type} />
}
