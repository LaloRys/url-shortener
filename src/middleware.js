import { NextResponse } from 'next/server'
import { redis } from '@/lib/redis'
import { validateUrl } from '@/util/validateUrl'
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  // Obtener la URL corta
  const { pathname } = request.nextUrl

  const parts = pathname.split('/')

  // Obtener la última parte de la URL
  const shortUrl = parts[parts.length - 1]

  // Cargar la URL larga desde Redis para la URL corta
  const longUrl = await redis.hget('links', shortUrl)
  // console.log("request.nextUrl.origin: ",request.nextUrl)

  // Redireccionar a la URL larga si existe
  if (longUrl) {
    if (validateUrl(longUrl)) {
      return NextResponse.redirect(new URL(longUrl, request.url))
    } else {
      console.error('La URL larga obtenida de Redis no es válida:', longUrl)
      // Manejar el caso en el que la URL larga no es válida
      return NextResponse.redirect(new URL('/', request.url))
    }
  } else {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/go/:path*'
}
