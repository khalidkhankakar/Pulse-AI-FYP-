'use client'
import { HeartPulse } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useState } from "react"
import { authClient } from "@/utils/auth-client"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function AuthForm({
  className,
  type = "LOGIN",

  ...props
}: React.ComponentProps<"div"> & { type?: "LOGIN" | "SIGNUP" }) {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const loginSocialAuth = async (provider: 'github' | 'google') => {

    // Call OAuth sign-in - this will redirect to provider
    await authClient.signIn.social({
      provider,
      callbackURL: "/dashboard",
    },
      {
        onRequest: () => {
          setIsLoading(true)
        },
        onSuccess: () => {
          // This callback is called when the OAuth flow is successful
          toast.success("Successfully authenticated with " + provider + "!")
          setIsLoading(false)
        },
        onError: (ctx) => {
          // This callback is called if there's an error during the OAuth flow
          console.error("OAuth error:", ctx.error.message)
          toast.error("Failed to authenticate with " + provider + ": " + (ctx.error.message || 'Unknown error'))
          setIsLoading(false)
        }
      }

    )

  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (type === "SIGNUP") {
      await authClient.signUp.email({
        email,
        name,
        password,
        callbackURL: "/dashboard",
      },
        {
          onRequest: () => {
            setIsLoading(true)
          },

          onSuccess: () => {
            toast.success("Account created successfully! Redirecting...")
            router.push("/dashboard")
            setIsLoading(false)
          },
          onError: (ctx) => {
            console.error("Signup error:", ctx.error.message)
            toast.error("Failed to create account: " + (ctx.error.message || 'Unknown error'))
            setIsLoading(false)
            
          }
        })

      return
    }

    // LOGIN
    await authClient.signIn.email({
      email,
      password,
    },
      {
        onRequest: () => {
          setIsLoading(true)
        },
        onSuccess: () => {
          toast.success("Logged in successfully!")
            router.push("/dashboard")
          setIsLoading(false)
        },
        onError: (ctx) => {
          console.error("Login error:", ctx.error.message)
          toast.error("Failed to login: " + (ctx.error.message || 'Unknown error'))
          setIsLoading(false)
        }
      })




  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <div
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <HeartPulse className="size-6" />
              </div>
              <span className="sr-only">Pulse AI.</span>
            </div>
            <h1 className="text-xl font-bold">Welcome {type === "SIGNUP" ? "to" : "back"} Pulse AI.</h1>
            <FieldDescription>
              {type === "SIGNUP" ? "Already have an account?" : "Don't have an account?"} <Link href={type === "SIGNUP" ? "/login" : "/signup"}>{type === "SIGNUP" ? "Login" : "Sign up"}</Link>
            </FieldDescription>
          </div>
          {type === "SIGNUP" && <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </Field>}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="johndoe@example.com"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </Field>

          <Field>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : (type === "SIGNUP" ? "Sign up" : "Login")}
            </Button>
          </Field>
          <FieldSeparator>Or</FieldSeparator>
          <Field className="grid gap-4 sm:grid-cols-2">
            <Button onClick={() => loginSocialAuth('github')} variant="outline" type="button" disabled={isLoading}>
              <Image src="/icons/github.svg" alt="Github" width={20} height={20} />
              Continue with Github
            </Button>
            <Button onClick={() => loginSocialAuth('google')} variant="outline" type="button" disabled={isLoading}>
              <Image src="/icons/google.svg" alt="Google" width={20} height={20} />
              Continue with Google
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
