/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const CartController = () => import('#controllers/cart_controller')
const HomeController = () => import('#controllers/home_controller')
const ProductsController = () => import('#controllers/products_controller')

router.get('/', [HomeController, 'show']).as('home').use(middleware.auth())

/*
|--------------------------------------------------------------------------
| Authentication routes
|--------------------------------------------------------------------------
*/
router
  .group(() => {
    router.get('/signup', [AuthController, 'showSignup']).as('showSignup')
    router.get('/login', [AuthController, 'showLogin']).as('showLogin')
  })
  .use(middleware.guest())

router.post('/signup', [AuthController, 'handleSignup']).as('handleSignup')
router.post('/login', [AuthController, 'handleLogin']).as('handleLogin')
router.post('/logout', [AuthController, 'handleLogout']).as('handleLogout')

/*
|--------------------------------------------------------------------------
| Products routes
|--------------------------------------------------------------------------
*/
// router.get('/products', [ProductsController, 'index']).as('products.index')
router
  .resource('products', ProductsController)
  .only(['index', 'show'])
  .params({ products: 'productSlugOrId' })
  .use('*', [middleware.auth()])

/*
|--------------------------------------------------------------------------
| Order routes
|--------------------------------------------------------------------------
*/
// router.get('/order', [CartController, 'index']).as('order.index').use([middleware.auth()])
router.resource('cart', CartController).use('*', [middleware.auth()])
