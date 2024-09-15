import logger from '@configs/logger';
import { Query } from 'drizzle-orm';
import { ResultSetHeader } from 'mysql2';

abstract class BaseRepository<T> {
  abstract create(payload: T): Promise<ResultSetHeader>;
  abstract find(range: number): Promise<T>;
  abstract get(id: number): Promise<T>;
  abstract update(id: number, payload: T): Promise<void>;
  abstract delete(id: number): Promise<void>;

  printSqlMetadata(sql: Query, field?: string) {
    logger.info(`Field : ${field || 'empty'}`);
    logger.sql(`Query : ${sql.sql}`, { sql });
    logger.sql(`Params : ${sql.params}`, { sql });
  }
}

export default BaseRepository;
