import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectURL = new URL('/', request.url)
  // utilizaremos cookies
  // calculando vencimento do cookie para 30 dias

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=; Path=/; max-age=0`,
    },
  })
}
