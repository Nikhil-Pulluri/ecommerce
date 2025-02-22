'use client'

import * as React from 'react'
import { useState } from 'react'
import { cn } from '../../lib/utils'
import { Icons } from '@/components/icons'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Eye, EyeClosed } from 'lucide-react'
import Checkbox from './checkbox'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [showPassword, setShowPassword] = useState<string>('password')
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isSeller, setIsSeller] = useState<boolean>(false)

  const handleSignUp = async (name: string, email: string, password: string, isSeller: Boolean) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    await fetch(`${backendUrl}/users/create-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        role: isSeller ? 'seller' : 'customer',
      }),
    })
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.target as HTMLFormElement)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // console.log('name:', name, 'email:', email, 'password:', password, 'isSeller:', isSeller)

    try {
      await handleSignUp(name, email, password, isSeller)
    } catch (error) {
      console.error('Sign-up failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label className="sr-only" htmlFor="email">
              Name
            </Label>
            <Input id="name" name="name" placeholder="Name" type="text" autoCapitalize="none" autoComplete="name" autoCorrect="off" disabled={isLoading} />
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input id="email" name="email" placeholder="name@example.com" type="email" autoCapitalize="none" autoComplete="email" autoCorrect="off" disabled={isLoading} />

            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <div className="flex space-x-2">
              <Input id="password" name="password" placeholder="password" type={`${showPassword}`} autoCapitalize="none" autoComplete="new-password" autoCorrect="off" disabled={isLoading} />
              <Button type="button" onClick={() => setShowPassword(showPassword === 'password' ? 'text' : 'password')}>
                {showPassword === 'password' ? <EyeClosed /> : <Eye />}
              </Button>
            </div>
            <div className="flex items-center space-x-1 mt-2 mb-2">
              <Checkbox checked={isSeller} onChange={() => setIsSeller((prev) => !prev)} />
              <Label className="text-sm" htmlFor="isSeller">
                Are you a seller? - {isSeller ? 'Yeah!🤫' : 'Nah! I am a customer😉'}
              </Label>
            </div>
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up with Email
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
