'use client'

import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"
import Link from "next/link"

const ERROR_MESSAGES: Record<string, { title: string; description: string }> = {
  state_mismatch: {
    title: "Session Error",
    description: "Your session state doesn't match. This can happen if you opened multiple login tabs or waited too long. Please try again.",
  },
  please_restart_the_process: {
    title: "Login Session Expired",
    description: "Your login session has expired. This can happen if you waited too long or your browser cookies were cleared. Please start the sign-in process again.",
  },
  access_denied: {
    title: "Access Denied",
    description: "You denied the permission request. Please try again and allow access to continue.",
  },
  invalid_request: {
    title: "Invalid Request",
    description: "The login request was invalid. Please try again.",
  },
  server_error: {
    title: "Server Error",
    description: "Something went wrong on the server. Please try again later.",
  },
  unknown_error: {
    title: "Unknown Error",
    description: "An unexpected error occurred. Please try again.",
  },
}

export function AuthErrorMessage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const errorCode = searchParams.get("error") || "unknown_error"
  const errorDescription = searchParams.get("error_description")

  const errorInfo = ERROR_MESSAGES[errorCode] || ERROR_MESSAGES.unknown_error

  const handleRetry = () => {
    // Remove error params and stay on page
    router.push(window.location.pathname)
  }

  return (
    <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 space-y-3">
      <div className="flex gap-3">
        <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
        <div className="flex-1 space-y-1">
          <h3 className="font-semibold text-destructive">{errorInfo.title}</h3>
          <p className="text-sm text-destructive/90">
            {errorDescription || errorInfo.description}
          </p>
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <Button
          onClick={handleRetry}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link href="/login">Back to Login</Link>
        </Button>
      </div>
    </div>
  )
}
