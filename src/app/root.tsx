import type { PropsWithChildren } from 'react'
import { Outlet, Scripts } from 'react-router'
import { Reshaped } from 'reshaped'
import { SystemThemeScript } from './components/system-theme-script'
import 'reshaped/themes/slate/theme.css'

export function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<html lang="en">
			<head>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</head>
			<body>
				<Reshaped theme="slate">{children}</Reshaped>
				<Scripts />
				<SystemThemeScript />
			</body>
		</html>
	)
}

export default function App() {
	return <Outlet />
}
