import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`App is listening on port ${config.port}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

main();

process.on('unhandledRejection', () => {
  // eslint-disable-next-line no-console
  console.log('👿 unhandledRejection is detected, shuting down the server');

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  // eslint-disable-next-line no-console
  console.log('👿 uncaughtException is detected, shuting down the server');

  process.exit(1);
});
