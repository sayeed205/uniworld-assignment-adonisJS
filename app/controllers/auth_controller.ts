import User from '#models/user'
import { signUpValidator } from '#validators/auth_validator'
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
  async handleSignup({ request, session, response, auth }: HttpContext) {
    const data = request.all()
    console.log(data)
    const payload = await request.validateUsing(signUpValidator)

    const userAlreadyExists = await User.findBy('email', payload.email)
    if (userAlreadyExists !== null) {
      session.flash('errors.email', 'Email already exists')
      return response.redirect().back()
    }

    const user = await User.create(payload)
    await user.save()
    await auth.use('web').login(user)
    return response.redirect().toRoute('home')
  }

  /**
   * Handle form submission for the login action
   */
  async handleLogin({ request }: HttpContext) {}
}
