import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'

import type { HasOne } from '@adonisjs/lucid/types/relations'
import Product from './product.js'
import User from './user.js'

export default class Cart extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare productId: string

  @column()
  declare quantity: number

  @column()
  declare userId: string

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
  public static async assignUUID(cart: Cart) {
    cart.id = cart.id || uuid()
  }

  /*
  |--------------------------------------------------------------------------
  | Relationships
  |--------------------------------------------------------------------------
  */
  @belongsTo(() => Product)
  declare product: HasOne<typeof Product>

  @belongsTo(() => User)
  declare user: HasOne<typeof User>
}
