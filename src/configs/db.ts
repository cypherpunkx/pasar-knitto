import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import configurations from '@configs/index';
import Bluebird from 'bluebird';
import logger from './logger';

const poolConnection = mysql.createPool({
  host: configurations.DB_HOST,
  user: configurations.DB_USER,
  password: configurations.DB_PASS,
  database: configurations.DB_NAME,
  port: configurations.DB_PORT,
  Promise: Bluebird,
});

export async function verifyDBConnection() {
  try {
    await poolConnection.ping();
    logger.info('terhubung');
  } catch (err) {
    logger.error(`Database connection failed ${(err as Error).message}`);
  }
}

const db = drizzle(poolConnection, { logger: true });

export default db;
