import { Link, useForm } from '@inertiajs/react'
import * as React from 'react'

import { Icons } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useError from '@/hooks/use_error'
import { cn } from '@/lib/utils'

interface LoginProps {}

const Login: React.FunctionComponent<LoginProps> = () => {
  const form = useForm({
    email: '',
    password: '',
  })
  const error = useError('auth')

  const [showPassword, setShowPassword] = React.useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let path = `/login`
    if (window.location.search.includes('next=')) {
      path += window.location.search
    }
    form.post(path)
  }

  return (
    <div className="container flex flex-col items-center justify-center w-screen h-screen">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-4 top-4 md:left-8 md:top-8'
        )}
      >
        <>
          <Icons.chevronLeft className="w-4 h-4 mr-2" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
        </div>
        <div className="grid gap-6">
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="john.doe@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={form.processing}
                  value={form.data.email}
                  onChange={(e) => form.setData('email', e.target.value)}
                />
              </div>
              <div className="relative">
                <Label className="sr-only" htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder="********"
                  type={showPassword ? 'text' : 'password'}
                  autoCapitalize="none"
                  disabled={form.processing}
                  value={form.data.password}
                  onChange={(e) => form.setData('password', e.target.value)}
                />
                <div
                  className="absolute top-0 bottom-0 right-0 flex items-center w-10 px-3 cursor-pointer text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Icons.eyeOff /> : <Icons.eye />}
                </div>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}

              <button className={cn(buttonVariants())} disabled={form.processing}>
                {form.processing && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />}
                Login
              </button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
            </div>
          </div>
        </div>
        <p className="px-8 text-sm text-center text-muted-foreground">
          <Link href="/signup" className="underline hover:text-brand underline-offset-4">
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
