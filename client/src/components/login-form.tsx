'use client'

import * as React from 'react'
import { useState } from 'react'
import { cn } from '../../lib/utils'
import { Icons } from '@/components/icons'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Eye, EyeClosed } from 'lucide-react'
import { useAuth } from '@/app/contexts/jwtContext'

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState<string>('password')
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { signIn } = useAuth()
  // const { user } = useAuth()

  const { token } = useAuth()

  async function handleSignIn(email: string, password: string) {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
      if (!backendUrl) throw new Error('Backend URL is missing')

      const response = await fetch(`${backendUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

      const data = await response.json()
      // console.log('Login successful:', data)
      signIn(data.access_token)
      // console.log('User signed in:', data)
      return data
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const onSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setIsLoading(true)

      try {
        await handleSignIn(email, password)
        console.log('Sign in completed')
        // console.log('Token:', token)
      } catch (error) {
        console.error('Submit error:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [email, password, handleSignIn]
  )

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form
        onSubmit={(e) => {
          console.log('Form submit event received')
          onSubmit(e)
        }}
      >
        <div className="grid gap-2">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Label className="sr-only" htmlFor="password">
            Password
          </Label>
          <div className="flex space-x-2">
            <Input
              id="password"
              placeholder="Password"
              type={showPassword}
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="button" onClick={() => setShowPassword(showPassword === 'password' ? 'text' : 'password')}>
              {showPassword === 'password' ? <EyeClosed /> : <Eye />}
            </Button>
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.gitHub className="mr-2 h-4 w-4" />} GitHub
      </Button>
    </div>
  )
}
