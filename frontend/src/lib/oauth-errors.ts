// Common OAuth error codes and descriptions
export const OAUTH_ERROR_CODES = {
  STATE_MISMATCH: "state_mismatch",
  PLEASE_RESTART: "please_restart_the_process",
  ACCESS_DENIED: "access_denied",
  INVALID_REQUEST: "invalid_request",
  SERVER_ERROR: "server_error",
} as const

export function getOAuthErrorMessage(errorCode?: string | null): string {
  const messages: Record<string, string> = {
    state_mismatch:
      "Your session expired. Please try logging in again.",
    please_restart_the_process:
      "The login session expired. Please try again.",
    access_denied:
      "You denied the permission. Please try again and allow access.",
    invalid_request:
      "The login request was invalid. Please try again.",
    server_error:
      "Server error occurred. Please try again later.",
  }

  return messages[errorCode || ""] || "An error occurred during login. Please try again."
}

export function hasOAuthError(searchParams: URLSearchParams): boolean {
  return searchParams.has("error")
}

export function getOAuthError(searchParams: URLSearchParams) {
  const error = searchParams.get("error")
  const description = searchParams.get("error_description")

  return {
    code: error,
    message: getOAuthErrorMessage(error),
    description,
  }
}
