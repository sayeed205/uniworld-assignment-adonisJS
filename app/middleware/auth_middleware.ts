import type { Authenticators } from '@adonisjs/auth/types'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/login'

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    // check if the route is cart or products if yes
    // then allow the request to pass through
    // without authentication
    // if authenticated and user available, then
    // set it on the HTTP context
    const isAuth = await ctx.auth.check()
    const { route } = ctx
    if (
      isAuth ||
      route?.pattern === '/cart' ||
      route?.pattern === '/products' ||
      route?.pattern === '/'
    ) {
      return next()
    }

    await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo })
    return next()
  }
}
