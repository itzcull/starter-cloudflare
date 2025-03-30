import app from './server'

export default {
	fetch: app.fetch
} satisfies ExportedHandler<Env>
