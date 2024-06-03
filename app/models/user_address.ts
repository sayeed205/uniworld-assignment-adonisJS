import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'
import User from './user.js'

export default class UserAddress extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userId: string

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

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  public static async assignUUID(userAddress: UserAddress) {
    userAddress.id = userAddress.id || uuid()
  }

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
