import 'dotenv/config';
import './configs/moduleAlias';
import http from 'http';
import cluster from 'cluster';
import os from 'os';
import portFinder from 'portfinder';
import app from './app';
import configuration from './configs';
import logger from './configs/logger';

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  logger.debug(`Master process ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, _code, _signal) => {
    logger.info(`Worker process ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  const server = http.createServer(app);
  portFinder
    .getPortPromise({
      host: configuration.SERVER_HOST,
      port: configuration.SERVER_PORT,
      startPort: 3000,
    })
    .then((port) => {
      server.listen(port, () => {
        logger.info(
          `Worker process ${process.pid} is listening on port ${port}`
        );
      });
    })
    .catch((err) => {
      logger.error(err);
      process.exit(1);
    });
}
