import { api } from '@/src/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  // console.log(searchParams) // URLSearchParams { 'code' => '9a19967c4f70fa8f7598' }
  const code = searchParams.get('code')

  const redirecTo = request.cookies.get('redirectTo')?.value

  const registerResponse = await api.post('/register', {
    code,
  })

  const { token } = registerResponse.data

  const redirectURL = redirecTo ?? new URL('/', request.url)
  // utilizaremos cookies
  // calculando vencimento do cookie para 30 dias
  const cookieExpiresInSeconds = 60 * 60 * 24 * 30
  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`,
    },
  })
}
