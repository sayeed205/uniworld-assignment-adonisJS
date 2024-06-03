import { ProductCategory } from '#lib/enums/product_enums'
import Product from '#models/product'
import factory from '@adonisjs/lucid/factories'

const ProductFactory = factory
  .define(Product, ({ faker }) => ({
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
    category: ProductCategory.CHAIRS,
  }))
  .state(ProductCategory.CHAIRS, (product) => (product.category = ProductCategory.CHAIRS))
  .state(ProductCategory.DINING_TOPS, (product) => (product.category = ProductCategory.DINING_TOPS))
  .state(ProductCategory.TABLES, (product) => (product.category = ProductCategory.TABLES))
  .build()

export default ProductFactory
