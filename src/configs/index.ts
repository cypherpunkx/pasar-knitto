export default {
  SERVER_HOST: process.env.HOST || 'localhost',
  SERVER_PORT: +process.env.PORT! || 3000,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASS: process.env.DB_PASS || '',
  DB_NAME: process.env.DB_NAME || '',
  DB_PORT: +process.env.DB_PORT! || 3306,
  SECRET: process.env.SECRET || 'secret',
  FILE_SIZE_LIMITS: +process.env.FILE_SIZE_LIMITS! || 1024 * 1024 * 5,
};
