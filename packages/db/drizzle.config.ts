import type { Config } from "drizzle-kit";

import { env } from "./src/client";

// const nonPoolingUrl = env.POSTGRES_URL.replace(":6543", ":5432");

export default {
  schema: "./src/schema",
  schemaFilter: ["public"],
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: { url: env.POSTGRES_URL },
  tablesFilter: [`${env.TABLE_PREFIX ?? "drizzle_"}*`],
} satisfies Config;
