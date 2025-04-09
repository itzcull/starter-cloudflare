import React, { type PropsWithChildren } from 'react'
import { Links, Meta, Scripts, ScrollRestoration } from 'react-router'

import { Reshaped, View } from 'reshaped'
import cssLink from './styles.css?url'

export function links() {
	return [{ rel: 'stylesheet', href: cssLink }]
}

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
				<Reshaped>{children}</Reshaped>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export default function App() {
	return (
		<View
			backgroundColor="neutral"
			width="100%">
			fdlskjfsd
		</View>
	)
}
