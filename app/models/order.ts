import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'

import { OrderStatus } from '#lib/enums/order_enums'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import OrderAddress from './order_address.js'
import Product from './product.js'
import User from './user.js'

export default class Order extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare productId: string

  @column()
  declare quantity: number

  @column()
  declare userId: string

  @column()
  declare status: OrderStatus

  @column()
  declare orderAddressId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /*
  |--------------------------------------------------------------------------
  | Hooks
  |--------------------------------------------------------------------------
  */
  @beforeCreate()
  public static async assignUUID(order: Order) {
    order.id = order.id || uuid()
  }

  /*
  |--------------------------------------------------------------------------
  | Relationships
  |--------------------------------------------------------------------------
  */
  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => OrderAddress)
  declare address: BelongsTo<typeof OrderAddress>
}
