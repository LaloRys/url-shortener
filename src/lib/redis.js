import { Redis } from '@upstash/redis'
  
export const redis = new Redis({
  url: process.env.NEXT_PUBLIC_DB_URL,
  token: process.env.NEXT_PUBLIC_DB_TOKEN
})
