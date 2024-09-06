import { defineConfig } from 'drizzle-kit';
import configurations from './src/configs';

export default defineConfig({
  dialect: 'mysql',
  schema: './src/models/*.model.ts',
  out: './database/migrations',
  introspect: { casing: 'camel' },
  migrations: { table: 'migrations' },
  dbCredentials: {
    host: configurations.DB_HOST,
    user: configurations.DB_USER,
    password: configurations.DB_PASS,
    database: configurations.DB_NAME,
    port: configurations.DB_PORT,
  },
});
