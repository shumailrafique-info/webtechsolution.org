import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { serverEnv } from "@/env/server";

export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: serverEnv.DATABASE_URL,
  },
});
