import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import configurations from '@configs/index';
import Bluebird from 'bluebird';

const poolConnection = mysql.createPool({
  host: configurations.DB_HOST,
  user: configurations.DB_USER,
  password: configurations.DB_PASS,
  database: configurations.DB_NAME,
  port: configurations.DB_PORT,
  Promise: Bluebird,
});

const db = drizzle(poolConnection);

export default db;
