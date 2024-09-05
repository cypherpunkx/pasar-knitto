import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import logger from '@configs/logger';
import errorMiddleware from '@middlewares/error.middleware';
import productRoutes from '@routes/product.routes';

const app = express();

app.use(compression());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.set('trust proxy', true);
app.use((req, _res, next) => {
  const ip = req.ip;
  logger.info(`Client IP: ${ip}`);
  next();
});

app.use('/api/v1/pasar-knitto/products', productRoutes);

app.use(errorMiddleware);

export default app;
