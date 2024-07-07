import { buildserver } from "./server";
import { PORT } from "./utils/constants";

export const server = buildserver();

async function main() {
  await server.listen({
    port: PORT,
    host: "0.0.0.0",
  });

  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.on(signal, async () => {
      await server.close();
      process.exit(0);
    });
  }
}

main();
