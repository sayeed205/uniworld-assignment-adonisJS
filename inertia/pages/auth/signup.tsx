import { Link, useForm } from '@inertiajs/react'
import * as React from 'react'

import { Icons } from '@/components/icons'
import Button, { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useError from '@/hooks/use_error'
import { cn } from '@/lib/utils'

interface SignUpProps {}

const SignUp: React.FunctionComponent<SignUpProps> = () => {
  const form = useForm({
    name: '',
    email: '',
    password: '',
  })
  const error = useError('auth')
  const [showPassword, setShowPassword] = React.useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.post('/signup')
  }

  return (
    <div className="container grid flex-col items-center justify-center w-screen h-screen lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8'
        )}
      >
        Login
      </Link>
      <div className="hidden h-full bg-muted lg:block" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            {/* <Icons.logo className="w-6 h-6 mx-auto" /> */}

            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <div className="grid gap-6">
            <form onSubmit={onSubmit}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="name">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John"
                    type="text"
                    disabled={form.processing}
                    value={form.data.name}
                    onChange={(e) => form.setData('name', e.target.value)}
                  />
                </div>

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
                <Button loading={form.processing} type="submit">
                  Sign Up
                </Button>
              </div>
            </form>
          </div>
          <p className="px-8 text-sm text-center text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-brand underline-offset-4">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline hover:text-brand underline-offset-4">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
