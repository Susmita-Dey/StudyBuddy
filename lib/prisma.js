import { PrismaClient } from '@prisma/client';

export const db = globalThis.prisma || new PrismaClient();

// If we're in development, let's make sure we're not creating multiple instances of Prisma Client
if (process.env.NODE_ENV !== "production") {
    globalThis.db = db;
}


// globalThis.prisma: This global variable ensures that the Prisma client instance is
// reused across hot reloads during development. Without this, each time your application
// reloads, a new instance of the Prisma client would be created, potentially leading
// to connection issues.
