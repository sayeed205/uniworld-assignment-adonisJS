import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Head, Link } from '@inertiajs/react'

export default function Home(props: { version: number }) {
  return (
    <>
      <Head title="Homepage" />

      <div className="container flex flex-col">
        <div className="title">AdonisJS {props.version} x Inertia x React</div>

        <span>
          Learn more about AdonisJS and Inertia.js by visiting the{' '}
          <a href="https://docs.adonisjs.com/guides/inertia">AdonisJS documentation</a>.
        </span>
        <Link
          as="button"
          href="logout"
          method="post"
          className={cn(buttonVariants({ variant: 'default' }), 'max-w-36')}
        >
          Logout
        </Link>
      </div>
    </>
  )
}
