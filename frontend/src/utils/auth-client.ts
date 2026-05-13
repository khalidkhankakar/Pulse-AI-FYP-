import { createAuthClient } from "better-auth/react"

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 
  (typeof window !== 'undefined' 
    ? window.location.origin 
    : 'http://localhost:3000');

export const authClient = createAuthClient({
    /** The base URL of the server */
    baseURL: baseURL
})

export const { signIn, signUp, useSession } = authClient;