import UserAddressesController from '#controllers/user_addresses_controller'
import Navbar from '@/components/navbar'
import Button, { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/react'

const AddressPage = (props: InferPageProps<UserAddressesController, 'index'>) => {
  const { cart, user, addresses } = props

  return (
    <div className="flex flex-col">
      <Navbar cart={cart} user={user} />
      <div className="flex items-center justify-center mt-20">
        <div className="w-full max-w-2xl">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">Addresses</h1>
            <Link
              as="button"
              href="/address/create"
              className={cn(buttonVariants({ variant: 'default' }))}
            >
              Add Address
            </Link>
          </div>
          <div className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              {addresses.map((address) => (
                <div key={address.id} className="p-4 rounded-lg shadow-md bg-background">
                  <h2 className="text-lg font-semibold">{address.name}</h2>
                  <p>{address.addressLine1}</p>
                  <p>{address.addressLine2}</p>
                  <p>{address.city}</p>
                  <p>{address.state}</p>
                  <p>{address.postalCode}</p>
                  <p>{address.country}</p>
                  <p>{address.phone}</p>

                  <div className="flex gap-3 mt-4">
                    <Button disabled>Edit - TODO</Button>
                    <Button disabled variant="destructive">
                      Delete - TODO
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddressPage
