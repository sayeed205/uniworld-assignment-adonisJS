import { OrderStatus } from '#lib/enums/order_enums'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('product_id').notNullable().references('products.id').onDelete('CASCADE')
      table.integer('quantity').notNullable().defaultTo(1)
      table.uuid('user_id').notNullable().references('users.id').onDelete('CASCADE')
      table.enum('status', Object.values(OrderStatus)).notNullable().defaultTo(OrderStatus.CART)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
