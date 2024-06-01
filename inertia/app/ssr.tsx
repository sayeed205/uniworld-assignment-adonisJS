import store from '@/redux/store'
import { createInertiaApp } from '@inertiajs/react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
      return pages[`../pages/${name}.tsx`]
    },
    setup: ({ App, props }) => (
      <Provider store={store}>
        <App {...props} />
      </Provider>
    ),
  })
}
