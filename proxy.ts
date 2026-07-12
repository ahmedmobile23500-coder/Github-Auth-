import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const session =
    request.cookies.get('next-auth.session-token') ||
    request.cookies.get('__Secure-next-auth.session-token')

  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard')

  const isAuthPage =
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname === '/signup'

  // 🚫 block dashboard if not logged in
  if (isDashboard && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 🚫 block login/signup if already logged in
  if (isAuthPage && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
}