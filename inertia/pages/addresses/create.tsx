import { InferPageProps } from '@adonisjs/inertia/types'

import UserAddressesController from '#controllers/user_addresses_controller'

import Navbar from '@/components/navbar'
import Button from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useForm } from '@inertiajs/react'

const CreateAddressPage = (props: InferPageProps<UserAddressesController, 'create'>) => {
  const { cart, user, countries } = props

  const form = useForm({
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
  })

  const error = form.errors

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.post('/address')
  }

  return (
    <div className="flex flex-col">
      <Navbar cart={cart} user={user} />
      <div className="flex items-center justify-center mt-20">
        <form className="w-full max-w-2xl" onSubmit={onSubmit}>
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
              <CardDescription>Enter your shipping address.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  type="text"
                  value={form.data.name}
                  onChange={(e) => form.setData('name', e.currentTarget.value)}
                  disabled={form.processing}
                />
                {error.name && <span className="text-xs text-destructive">{error.name}</span>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input
                  id="addressLine1"
                  placeholder="Enter your address"
                  type="text"
                  value={form.data.addressLine1}
                  onChange={(e) => form.setData('addressLine1', e.currentTarget.value)}
                  disabled={form.processing}
                />
                {form.errors.addressLine1 && (
                  <span className="text-xs text-destructive">{form.errors.addressLine1}</span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input
                  id="addressLine2"
                  placeholder="Apartment, suite, etc."
                  type="text"
                  value={form.data.addressLine2}
                  onChange={(e) => form.setData('addressLine2', e.currentTarget.value)}
                  disabled={form.processing}
                />
                {error.addressLine2 && (
                  <span className="text-xs text-destructive">{error.addressLine2}</span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="Enter your city"
                  type="text"
                  value={form.data.city}
                  onChange={(e) => form.setData('city', e.currentTarget.value)}
                  disabled={form.processing}
                />
                {error.city && <span className="text-xs text-destructive">{error.city}</span>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  placeholder="Enter your state"
                  type="text"
                  value={form.data.state}
                  onChange={(e) => form.setData('state', e.currentTarget.value)}
                  disabled={form.processing}
                />
                {error.state && <span className="text-xs text-destructive">{error.state}</span>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="postalCode">Zip Code</Label>
                <Input
                  id="postalCode"
                  placeholder="Enter your zip code"
                  type="text"
                  value={form.data.postalCode}
                  onChange={(e) => form.setData('postalCode', e.currentTarget.value)}
                  disabled={form.processing}
                />
                {error.postalCode && (
                  <span className="text-xs text-destructive">{error.postalCode}</span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  defaultValue=""
                  id="country"
                  onValueChange={(value) => {
                    form.setData('country', value)
                  }}
                  disabled={form.processing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.name}>
                        {country.name} ({country.dial_code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {error.country && <span className="text-xs text-destructive">{error.country}</span>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  type="text"
                  value={form.data.phone}
                  onChange={(e) => form.setData('phone', e.currentTarget.value)}
                  disabled={form.processing}
                />
                {error.phone && <span className="text-xs text-destructive">{error.phone}</span>}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="mr-2" type="submit">
                Cancel
              </Button>
              <Button>Save Address</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  )
}

export default CreateAddressPage
