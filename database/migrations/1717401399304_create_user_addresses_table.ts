import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.uuid('user_id').notNullable().references('users.id').onDelete('CASCADE')
      table.string('address_line_1').notNullable()
      table.string('address_line_2').nullable()
      table.string('city').notNullable()
      table.string('state').notNullable()
      table.integer('postal_code').notNullable()
      table.string('country').notNullable()
      table.string('phone').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
