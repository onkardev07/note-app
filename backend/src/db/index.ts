// import { PrismaClient } from "@prisma/client";

// export const prismaClient = new PrismaClient();

import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL, // Ensure it picks up the environment variable
    },
  },
});
