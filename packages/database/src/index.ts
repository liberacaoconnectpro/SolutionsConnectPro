// SQLite nativo removido temporariamente para o Preview Web funcionar.
// Quando exportar para Electron, descomente o bloco de código local e instale better-sqlite3
import * as schema from './schema';

/*
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const sqlite = new Database('connect-erp-local.db');

export const dbInit = () => {
    sqlite.pragma('journal_mode = WAL');
    sqlite.pragma('foreign_keys = ON');
}

export const db = drizzle(sqlite, { schema });
*/

// Mock for Web Preview
export const dbInit = () => { console.log('SQLite init mocked for Web Preview'); }
export const db = {
  select: () => ({ from: () => ({ where: () => ({ all: () => [] }) }) }),
  insert: () => ({ values: () => ({ onConflictDoUpdate: () => ({ run: () => {} }) }) }),
  update: () => ({ set: () => ({ where: () => ({ run: () => {} }) }) }),
} as any;

export { schema };
