import { NextRequest, NextResponse } from 'next/server'

/**
 * OAuth Error Handler
 * 
 * This endpoint is called when Better Auth encounters an OAuth error
 * It redirects the user back to the login page with error details
 */

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  // Log errors for debugging
  console.error('[OAuth Error]', {
    error,
    description: errorDescription,
  })

  // Redirect back to login with error details
  const loginUrl = new URL('/login', request.url)
  if (error) {
    loginUrl.searchParams.set('error', error)
  }
  if (errorDescription) {
    loginUrl.searchParams.set('error_description', errorDescription)
  }

  return NextResponse.redirect(loginUrl)
}
