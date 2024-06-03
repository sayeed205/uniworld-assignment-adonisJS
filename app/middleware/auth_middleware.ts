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
    // check if the route is order or products if yes
    // then allow the request to pass through
    // without authentication
    // if authenticated and user available, then
    // set it on the HTTP context
    const isAuth = await ctx.auth.check()
    const { route, request } = ctx
    if (
      isAuth ||
      route?.pattern === '/cart' ||
      route?.pattern === '/products' ||
      route?.pattern === '/' ||
      route?.pattern === '/products/:productSlugOrId'
    ) {
      return next()
    }

    const url = request.parsedUrl

    await ctx.auth.authenticateUsing(options.guards, {
      loginRoute: this.redirectTo + `?next=${url.href}`,
    })
    return next()
  }
}
