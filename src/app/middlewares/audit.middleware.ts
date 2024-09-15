import logger from '@configs/logger';
import type { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

function auditMiddleware(req: Request, _res: Response, next: NextFunction) {
  const { method, originalUrl } = req;

  const user = req.user as JwtPayload & {
    data: string;
  };

  const username = (user && user.data) || 'anonymous';

  logger.info(`User ${username} accessed ${method}: ${originalUrl}`);

  next();
}

export default auditMiddleware;
