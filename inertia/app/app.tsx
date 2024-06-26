/// <reference path="../../adonisrc.ts" />

import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { createInertiaApp } from '@inertiajs/react'
import { hydrateRoot } from 'react-dom/client'

import store from '@/redux/store'
import { Provider } from 'react-redux'
import '../css/app.css'

const appName = import.meta.env.VITE_APP_NAME || 'Uniworld'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    return resolvePageComponent(`../pages/${name}.tsx`, import.meta.glob('../pages/**/*.tsx'))
  },

  setup({ el, App, props }) {
    hydrateRoot(
      el,
      <Provider store={store}>
        <App {...props} />
      </Provider>
    )
  },
})
