import { redis } from '@/lib/redis'
import { NextResponse } from 'next/server'

export async function GET() {
  const links = (await redis.hgetall('links')) || []

  return NextResponse.json({ links })
}
