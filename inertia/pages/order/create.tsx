import OrdersController from '#controllers/orders_controller'
import { Icons } from '@/components/icons'
import Navbar from '@/components/navbar'
import Button, { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Link, router } from '@inertiajs/react'
import { useState } from 'react'

const OrderCheckoutPage = (props: InferPageProps<OrdersController, 'index'>) => {
  const { user, cart, addresses } = props

  const [selectedAddress, setSelectedAddress] = useState(addresses[0])

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="flex flex-col">
      <Navbar user={user} cart={cart} />
      <div className="flex flex-col">
        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">Checkout</h1>
            </div>
            <div className="grid gap-8">
              <div>
                <div className="flex justify-between">
                  <h2 className="mb-4 text-lg font-semibold">Delivery Address</h2>
                  <Link
                    href="/address/create?next=orders/create"
                    as="button"
                    className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                  >
                    Add New Address
                  </Link>
                </div>
                <div className="grid gap-4">
                  {addresses.map((address: any) => (
                    <div
                      key={address.id}
                      className={`border rounded-md p-4 cursor-pointer transition-colors ${
                        selectedAddress.id === address.id ? 'bg-muted' : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedAddress(address)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{address.name}</div>
                          <div>
                            {address.addressLine1}
                            {address.addressLine2 && `, ${address.addressLine2}`}
                          </div>
                          <div>
                            {address.city}, {address.state} - {address.postalCode}
                          </div>
                        </div>
                        {selectedAddress.id === address.id && (
                          <Icons.check className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  size="lg"
                  onClick={() => {
                    router.post('/orders', {
                      addressId: selectedAddress.id,
                    })
                  }}
                  disabled={!addresses.length}
                >
                  Continue to Payment
                </Button>
              </div>
            </div>
          </div>
        </main>
        <div className="border-l lg:block bg-gray-100/40 dark:bg-gray-800/40">
          <div className="flex flex-col h-full max-h-screen gap-2">
            <div className="flex h-[60px] items-center border-b px-6">
              <h2 className="text-lg font-semibold">Order Summary</h2>
            </div>
            <div className="flex-1 p-6 overflow-auto">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>Subtotal</div>
                  <div>$ {total}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>Shipping</div>
                  <div>Free</div>
                </div>
                <div className="flex items-center justify-between font-medium">
                  <div>Total</div>
                  <div>$ {total}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderCheckoutPage
