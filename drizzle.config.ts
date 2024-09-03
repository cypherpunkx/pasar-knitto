import { defineConfig } from 'drizzle-kit';
import configurations from '@/configs';

export default defineConfig({
  dialect: 'mysql',
  schema: './src/schema.ts',
  out: './database/migrations',
  dbCredentials: {
    host: configurations.DB_HOST,
    user: configurations.DB_USER,
    password: configurations.DB_PASS,
    database: configurations.DB_NAME,
    port: configurations.DB_PORT,
  },
});
