import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'
import Order from './order.js'

export default class OrderAddress extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare addressLine1: string

  @column()
  declare addressLine2: string

  @column()
  declare city: string

  @column()
  declare state: string

  @column()
  declare postalCode: number

  @column()
  declare country: string

  @column()
  declare phone: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @beforeCreate()
  public static async assignUUID(orderAddress: OrderAddress) {
    orderAddress.id = orderAddress.id || uuid()
  }

  @hasMany(() => Order)
  declare orders: HasMany<typeof Order>
}
