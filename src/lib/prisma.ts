import "dotenv/config"; // This line reads the .env file and loads all the variables from .env files
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL; // reading my database url from .env file

if (!connectionString) {
    throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({ connectionString }); // prismaPg is a PostgreSQL adapter for Prisma, allowing you to connect to a PostgreSQL database using the provided connection string.

export const prisma = new PrismaClient({ adapter }); // the PrismaClient creates a prisma client instance