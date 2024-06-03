import string from '@adonisjs/core/helpers/string'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'

import { ProductCategory } from '#lib/enums/product_enums'
import isUUID from '#lib/is_uuid'
import Order from './order.js'

export default class Product extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column() // in usd
  declare price: number

  @column()
  declare category: ProductCategory

  @column()
  declare slug: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  public static async assignUUIDandSlug(product: Product) {
    product.id = product.id || uuid()
    if (product.slug) return

    const slug = string.slug(product.name, {
      lower: true,
      replacement: '-',
      strict: true,
      remove: /[|]/g,
    })

    const rows = await Product.query()
      .select('slug')
      .whereRaw('lower(??) = ?', ['slug', slug])
      .orWhereRaw('lower(??) like ?', ['slug', `${slug}-%`])

    if (!rows.length) {
      product.slug = slug
      return
    }

    const incrementor = rows.reduce<number[]>(
      (acc, row) => {
        const match = row.slug.match(new RegExp(`^${slug}-(\\d+)$`, 'i'))
        if (match) {
          acc.push(parseInt(match[1], 10))
        }
        return acc
      },
      [0]
    )

    product.slug = incrementor.length ? `${slug}-${Math.max(...incrementor) + 1}` : slug
  }

  static getProductBySlugOrId(slugOrId: string) {
    return isUUID(slugOrId)
      ? Product.query().where('id', slugOrId).first()
      : Product.query().where('slug', slugOrId).first()
  }

  /*
  |--------------------------------------------------------------------------
  | Relationships
  |--------------------------------------------------------------------------
  */
  @hasMany(() => Order)
  declare orders: HasMany<typeof Order>
}
