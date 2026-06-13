import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
import {config} from 'dotenv'

config({path: '.env.local'}); // Load environment variables from .env file

const databaseUrl = process.env.DATABASE_URL;

console.log('Database URL:', databaseUrl); 

if (!databaseUrl) {
    throw new Error('DATABASE_URL is not defined');
}

export const client = neon(databaseUrl);
export const db = drizzle({client, schema, logger: true});

