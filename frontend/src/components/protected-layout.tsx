'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '@/utils/auth-client'
import { Spinner } from '@/components/ui/spinner'

interface ProtectedLayoutProps {
  children: React.ReactNode
}

export function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const router = useRouter()
  const { data: session, isPending } = useSession()

  useEffect(() => {
    // If session is loaded and no user is authenticated, redirect to login
    
    if (!isPending && !session) {
      router.push('/login')
    }
  }, [session, isPending, router])

  // Show loading spinner while checking authentication
  if (isPending || !session) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Spinner className="h-12 w-12" />
      </div>
    )
  }

  return <>{children}</>
}
