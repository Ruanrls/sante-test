import { PrismaClient } from "@prisma/client";
import type { Prisma } from "@prisma/client";

const logs = ["error"] as Prisma.LogLevel[];

if (process.env.NODE_ENV !== "production") {
  logs.concat(["query", "info", "warn"]);
}

export const db = new PrismaClient({ log: logs });
