import type { Request, Response, NextFunction } from 'express';
import { sendResponse } from '@utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import logger from '@configs/logger';
import { HttpError } from 'http-errors';
import { ValiError } from 'valibot';
import jwt from 'jsonwebtoken';
import { MulterError } from 'multer';

function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  switch (true) {
    case error instanceof jwt.JsonWebTokenError:
      logger.error(`Token verification failed: ${error.message}`, { error });
      sendResponse(
        {
          statusCode: StatusCodes.UNAUTHORIZED,
          status: 'error',
          message: 'Invalid token',
        },
        res
      );
      break;

    case error instanceof jwt.TokenExpiredError:
      logger.error(`Token verification failed: ${error.message}`, { error });
      sendResponse(
        {
          statusCode: StatusCodes.UNAUTHORIZED,
          status: 'error',
          message: 'Token expired',
        },
        res
      );
      break;
    case error instanceof HttpError:
      logger.error(error.message, { error });
      sendResponse(
        {
          statusCode: error.statusCode,
          status: 'error',
          message: error.message,
        },
        res
      );
      break;

    case error instanceof ValiError:
      logger.error(`Validation error : ${error.message}`, { error });
      sendResponse(
        {
          statusCode: StatusCodes.BAD_REQUEST,
          status: 'error',
          message: error.message,
        },
        res
      );
      break;
    case error instanceof MulterError:
      console.log(error);
      logger.error(`Multer error : ${error.message}`, { error });
      sendResponse(
        {
          statusCode: StatusCodes.BAD_REQUEST,
          status: 'error',
          message: error.message,
        },
        res
      );
      break;
    default:
      console.log(error);
      logger.error(
        `An unexpected error occurred: ${(error as Error).message}`,
        {
          error,
        }
      );
      sendResponse(
        {
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          status: 'error',
          message: 'An unexpected error occurred',
        },
        res
      );
      break;
  }
}

export default errorMiddleware;
