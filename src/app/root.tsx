import type { PropsWithChildren } from 'react'
import { Outlet, Scripts } from 'react-router'

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
				{children}
				<Scripts />
			</body>
		</html>
	)
}

export default function App() {
	return <Outlet />
}
