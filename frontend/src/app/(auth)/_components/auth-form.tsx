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
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const loginSocialAuth = async (provider: 'github' | 'google') => {
    try {
      setIsLoading(true)
      // Remove disableRedirect to let better-auth handle the redirect
      await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
      })
    } catch (error: any) {
      console.error({ error })
      toast.error(error?.message || 'Social login failed')
      setIsLoading(false)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    try {
      setIsLoading(true)

      if (type === "SIGNUP") {
        const result = await authClient.signUp.email({
          email,
          name,
          password,
        })
        
        if (result.error) {
          toast.error(result.error.message || 'Sign up failed')
          setIsLoading(false)
          return
        }

        toast.success('Account created successfully! Redirecting...')
        setTimeout(() => {
          router.push("/dashboard")
        }, 1000)
        return
      }

      // LOGIN
      const result = await authClient.signIn.email({
        email,
        password,
      })

      if (result.error) {
        toast.error(result.error.message || 'Login failed')
        setIsLoading(false)
        return
      }

      toast.success('Logged in successfully!')
      setTimeout(() => {
        router.push("/dashboard")
      }, 500)
    } catch (error: any) {
      console.error({ error })
      toast.error(error?.message || 'Authentication failed')
      setIsLoading(false)
    }
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
            <Button type="submit">{type === "SIGNUP" ? "Sign up" : "Login"}</Button>
          </Field>
          <FieldSeparator>Or</FieldSeparator>
          <Field className="grid gap-4 sm:grid-cols-2">
            <Button onClick={() => loginSocialAuth('github')} variant="outline" type="button">
              <Image src="/icons/github.svg" alt="Apple" width={20} height={20} />
              Continue with Github
            </Button>
            <Button onClick={() => loginSocialAuth('google')} variant="outline" type="button">
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
