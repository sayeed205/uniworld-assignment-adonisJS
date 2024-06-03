import { InferPageProps } from '@adonisjs/inertia/types'

import { DateTime } from 'luxon'

import OrdersController from '#controllers/orders_controller'
import { OrderStatus } from '#lib/enums/order_enums'

import Navbar from '@/components/navbar'

const OrdersPage = (props: InferPageProps<OrdersController, 'index'>) => {
  const { orders, user, cart } = props
  return (
    <div className="flex flex-col">
      <Navbar user={user} cart={cart} />
      <div className="container px-4 py-8 mx-auto md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">All Orders</h1>
          {/* <div className="relative">
            <Icons.search className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2 dark:text-gray-400" />
            <Input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={handleSearch}
              className="py-2 pl-10 pr-4 bg-white rounded-md dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div> */}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-3 font-medium text-left text-foreground">Order #</th>
                <th className="px-4 py-3 font-medium text-left text-foreground">Date</th>
                <th className="px-4 py-3 font-medium text-right text-foreground">Total</th>
                <th className="px-4 py-3 font-medium text-left text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const total = order.product.price * order.quantity
                return (
                  <tr key={order.id} className="border-b border-border hover:bg-muted">
                    <td className="px-4 py-3 font-medium text-left">{order.id}</td>
                    <td className="px-4 py-3 text-left">
                      {DateTime.fromISO(order.createdAt).toRelative()}
                    </td>
                    <td className="px-4 py-3 text-right">${total}</td>
                    <td className="px-4 py-3 text-left">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === OrderStatus.DELIVERED
                            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                            : order.status === OrderStatus.PLACED
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                              : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-6">
          {/* <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {indexOfFirstOrder + 1} to {indexOfLastOrder} of {filteredOrders.length} orders
          </div> */}
          <div>
            {/* <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrdersPage
