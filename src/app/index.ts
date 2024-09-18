import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import logger from '@configs/logger';
import errorMiddleware from './middlewares/error.middleware';
import productRoutes from './routes/product.routes';
import authRoutes from './routes/auth.routes';
import path from 'path';

const app = express();

app.use(compression());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/static', express.static(path.join(process.cwd(), 'public')));

app.set('trust proxy', true);

app.use((req, _res, next) => {
  const ip = req.ip;
  logger.info(`Client IP: ${ip}`);
  next();
});

app.use('/api/v1/pasar-knitto/auth', authRoutes);
app.use('/api/v1/pasar-knitto/products', productRoutes);

app.use(errorMiddleware);

export default app;
