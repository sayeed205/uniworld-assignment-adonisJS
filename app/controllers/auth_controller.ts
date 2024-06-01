import User from '#models/user'
import { signInValidator, signUpValidator } from '#validators/auth_validator'
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
  async showLogin({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  /**
   * Handle form submission for the signup action
   */
  async handleSignup({ request, session, response, auth }: HttpContext) {
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
  async handleLogin({ request, response, auth, session }: HttpContext) {
    const { email, password } = await request.validateUsing(signInValidator)
    const nextPath = request.input('next')
    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)

      if (nextPath) {
        return response.redirect().toPath(nextPath)
      }

      return response.redirect().toRoute('home')
    } catch {
      session.flash('errors.auth', 'Invalid credentials')
      let backPath = '/login'
      if (nextPath) {
        backPath += `?next=${nextPath}`
      }
      return response.redirect().toPath(backPath)
    }
  }

  /**
   * Handle form submission for the logout action
   */
  async handleLogout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('home')
  }
}
