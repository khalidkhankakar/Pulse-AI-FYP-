import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that don't require authentication
const PUBLIC_ROUTES = [
  '/login',
  '/signup',
  '/api/auth', // Allow all auth API routes
]

// Routes that require authentication
const PROTECTED_ROUTES = [
  '/dashboard',
]

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Check if the route is public
  const isPublicRoute = PUBLIC_ROUTES.some(route => {
    if (route.includes('/api/')) {
      return pathname.startsWith(route)
    }
    return pathname === route || pathname.startsWith(route + '/')
  })

  // Check if the route is protected
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  )

  // Get session from cookies
  const sessionToken = request.cookies.get('better-auth.session_token')?.value
  const sessionData = request.cookies.get('better-auth.session')?.value

  const isAuthenticated = !!(sessionToken || sessionData)

  // If user is authenticated and trying to access login/signup, redirect to dashboard
  if (isAuthenticated && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If user is not authenticated and trying to access protected route, redirect to login
  if (!isAuthenticated && isProtectedRoute) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
