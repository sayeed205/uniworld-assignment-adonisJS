import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  /**
   * Display signup page
   */
  async showSignup({ inertia }: HttpContext) {
    return inertia.render('auth/signup')
  }

  /**
   * Display login page
   */
  async showLogin({}: HttpContext) {}

  /**
   * Handle form submission for the signup action
   */
  async handleSignup({ request }: HttpContext) {}

  /**
   * Handle form submission for the login action
   */
  async handleLogin({ request }: HttpContext) {}
}
