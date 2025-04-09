import React, { type PropsWithChildren } from 'react'
import { Links, Meta, Scripts, ScrollRestoration } from 'react-router'

import './styles.css'

export function Layout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export default function App() {
	return <main className="bg-red-500 w-full h-20">fdlskjfsd</main>
}
