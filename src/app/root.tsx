import React, { type PropsWithChildren } from 'react'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'

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

				{/* Manages scroll position for client-side transitions */}
				{/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
				<ScrollRestoration />

				{/* Script tags go here */}
				{/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
				<Scripts />
			</body>
		</html>
	)
}

export default function App() {
	return <>fdlskjfsd</>
}
