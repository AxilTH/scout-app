import 'dotenv/config';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from './schema.d';

function loadContractJson(): Contract {
  const candidates = [
    join(__dirname, 'prisma', 'schema.json'),
    join(__dirname, 'schema.json'),
  ];

  for (const path of candidates) {
    if (existsSync(path)) {
      return JSON.parse(readFileSync(path, 'utf-8')) as Contract;
    }
  }

  throw new Error('schema.json not found for Prisma contract');
}

const contractJson = loadContractJson();
const databaseUrl = process.env['DATABASE_URL'];

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}

export const db = postgres<Contract>({
  contractJson,
  url: databaseUrl,
});
