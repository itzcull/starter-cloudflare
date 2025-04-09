import { createRequestHandler } from "react-router";

interface QueueMessage {
	foo: string
}

declare module "react-router" {
	export interface AppLoadContext {
		cloudflare: {
			env: Env;
			ctx: ExecutionContext;
		};
	}
}

const requestHandler = createRequestHandler(
	() => import("virtual:react-router/server-build"),
	import.meta.env.MODE
);

export default {
	async fetch(request, env, ctx) {
		return requestHandler(request, {
			cloudflare: { env, ctx },
		});
	},
	queue(batch, _env, _ctx) {
		for (const message of batch.messages) {
			console.log(message)
		}
	},
	scheduled(controller, _env, _ctx) {
		console.log(`Run at "${new Date(controller.scheduledTime).toISOString()}" with CRON "${controller.cron}"`)
	}
} satisfies ExportedHandler<Env, QueueMessage>
