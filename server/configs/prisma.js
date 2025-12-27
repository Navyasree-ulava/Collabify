import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig, Pool } from '@neondatabase/serverless';
import ws from 'ws';

// Mandatory for Node.js serverless functions using WebSockets
neonConfig.webSocketConstructor = ws;

/**
 * Robust database client initialization for Vercel Serverless
 */
const connectionString = process.env.DATABASE_URL;

const prismaClientSingleton = () => {
    if (!connectionString) {
        throw new Error('DATABASE_URL is not defined in the environment variables. Please check your Vercel Dashboard.');
    }

    // Explicitly pass the connection string to the Pool
    const pool = new Pool({ connectionString: connectionString });
    const adapter = new PrismaNeon(pool);
    
    return new PrismaClient({ 
        adapter,
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
    });
};

// Use globalThis to prevent multiple instances during hot-reloading in dev
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') {
    globalThis.prismaGlobal = prisma;
}