import type { PropsWithChildren } from 'react'
import { Outlet, Scripts } from 'react-router'
import { Reshaped } from 'reshaped'

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
			</body>
		</html>
	)
}

export default function App() {
	return <Outlet />
}
