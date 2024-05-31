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

router
  .get('/', ({ inertia }) => {
    return inertia.render('home', { version: 6 })
  })
  .as('home')
  .use(middleware.auth())

/*
|--------------------------------------------------------------------------
| Authentication routes
|--------------------------------------------------------------------------
*/
router.get('/signup', [AuthController, 'showSignup']).as('showSignup')
router.get('/login', [AuthController, 'showLogin']).as('showLogin')

router.post('/signup', [AuthController, 'handleSignup']).as('handleSignup')
router.post('/login', [AuthController, 'handleLogin']).as('handleLogin')
router.post('/logout', [AuthController, 'handleLogout']).as('handleLogout')
