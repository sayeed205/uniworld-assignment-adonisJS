import ProductFactory from '#database/factories/product_factory'
import { ProductCategory } from '#lib/enums/product_enums'
import Product from '#models/product'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { v4 as uuid } from 'uuid'

export default class extends BaseSeeder {
  async run() {
    await ProductFactory.createMany(10)
    await Product.createMany([
      {
        id: uuid(),
        name: 'Lounge Chair',
        price: 2000,
        category: ProductCategory.CHAIRS,
      },
      {
        id: uuid(),
        name: 'Dining Chair',
        price: 1800,
        category: ProductCategory.CHAIRS,
      },
      {
        id: uuid(),
        name: 'Table1',
        price: 3000,
        category: ProductCategory.TABLES,
      },
      {
        id: uuid(),
        name: 'Table2',
        price: 3200,
        category: ProductCategory.TABLES,
      },
      {
        id: uuid(),
        name: 'Table3',
        price: 3100,
        category: ProductCategory.TABLES,
      },
      {
        id: uuid(),
        name: 'Dining Top',
        price: 900,
        category: ProductCategory.DINING_TOPS,
      },
    ])
  }
}
