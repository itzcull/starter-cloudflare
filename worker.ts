
import app from "./src/index";

export default {
  fetch: app.fetch
} satisfies ExportedHandler<Env>;
