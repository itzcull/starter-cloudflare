import * as isbotModule from 'isbot'
import React from 'react'
// Look inside env.d.ts for the following line & github discussion link:
import { renderToReadableStream } from 'react-dom/server.edge'
import type { ActionFunctionArgs, AppLoadContext, EntryContext, LoaderFunctionArgs } from 'react-router'
import { ServerRouter, isRouteErrorResponse } from 'react-router'

export default async function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	context: EntryContext,
	_loadContext: AppLoadContext
) {
	let statusCode: number = responseStatusCode

	const body = await renderToReadableStream(
		<ServerRouter
			context={context}
			url={request.url}
		/>,
		{
			signal: request.signal,
			onError(error: unknown) {
				// Log streaming rendering errors from inside the shell
				console.error(error)
				statusCode = 500
			}
		}
	)

	if (isBotRequest(request.headers.get('user-agent'))) {
		await body.allReady
	}

	responseHeaders.set('Content-Type', 'text/html')
	return new Response(body, {
		headers: responseHeaders,
		status: statusCode
	})
}

export function handleError(error: unknown, { request }: LoaderFunctionArgs | ActionFunctionArgs) {
	if (!request.signal.aborted) {
		if (error instanceof Error) {
			console.error(error.message)
		} else if (isRouteErrorResponse(error)) {
			if (error.status >= 400 && error.status < 500) {
				if (error.status !== 404) {
					console.error(error.status, error.statusText, JSON.stringify(error.data))
				} else {
					console.info(error.status, error.statusText, JSON.stringify(error.data))
				}
			} else if (error.status >= 500 && error.status < 600) {
				console.error(error.status, error.statusText, JSON.stringify(error.data))
			}
		} else {
			console.error(JSON.stringify(error))
		}
	}
}

function isBotRequest(userAgent: string | null) {
	if (!userAgent) {
		return false
	}

	if ('isbot' in isbotModule && typeof isbotModule.isbot === 'function') {
		return isbotModule.isbot(userAgent)
	}

	return false
}
