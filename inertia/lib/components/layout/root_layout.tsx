import { updateCartFromLocalStorageToServer } from '@/lib/utils'

interface RootLayoutProps {
  user: any
}

const RootLayout: React.FunctionComponent<React.PropsWithChildren<RootLayoutProps>> = ({
  children,
  user,
}) => {
  user && updateCartFromLocalStorageToServer()
  return <div>{children}</div>
}

export default RootLayout
