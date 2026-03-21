import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import { Reshaped } from 'reshaped'
import { SystemThemeScript } from '../components/system-theme-script'
import 'reshaped/themes/slate/theme.css'

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    links: [{ rel: 'icon', href: '/favicon.ico' }],
  }),
})

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Reshaped theme="slate">
          <Outlet />
        </Reshaped>
        <Scripts />
        <SystemThemeScript />
      </body>
    </html>
  )
}
