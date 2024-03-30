import { redis } from '@/lib/redis'
import { NextResponse } from 'next/server'

export async function POST(request) {
  // get longUrl from body
  const { longUrl } = await request.json()
  console.log('Desde el servidor: ', longUrl)

  if (!longUrl || longUrl.length <= 0) {
    return NextResponse.json({ error: 'Invalid longUrl' }, { status: 400 })
  }

  // generate short url
  const shortUrl = makeShortUrl(4)
  
  console.log(shortUrl)

  // save it to redis
  try {
    // Guardar la URL corta y la URL larga en Redis
    await redis.hset('links', { [shortUrl]: longUrl })

    // Retornar la URL corta y la URL larga agregadas
    return NextResponse.json({
      shortUrl,
      longUrl,
      message: 'Short URL generated successfully'
    })
  } catch (error) {
    console.error('Error while saving data to Redis:', error)
    return NextResponse.json({ error: 'Failed to save data to Redis' }, { status: 500 })
  }

  // await redis.hset('key', { field: 'value' })
  // const field = await redis.hget('key', 'field')
  // const hash = await redis.hgetall('links')
  // console.log(hash) // "value"

}

const makeShortUrl = (length) => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
