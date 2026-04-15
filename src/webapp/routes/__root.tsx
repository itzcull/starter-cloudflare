import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import { Provider } from '../components/ui/provider'

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    links: [{ rel: 'icon', href: '/favicon.ico' }],
  }),
})

function RootComponent() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <Provider>
          <Outlet />
        </Provider>
        <Scripts />
      </body>
    </html>
  )
}
