import { ProductCategory } from '#lib/enums/product_enums'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.decimal('price').notNullable
      table.enum('category', Object.values(ProductCategory)).notNullable()
      table.string('slug').notNullable().unique()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    await this.schema.dropTable(this.tableName)
  }
}
