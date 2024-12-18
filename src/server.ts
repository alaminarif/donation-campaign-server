import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
import { Server } from 'http';
import seedSuperAdmin from './app/DB';
// import { errorLogger, logger } from './share/logger';

// Handle uncaught Exception
process.on('uncaughtException', error => {
  console.log(`uncaught Exception is detected: ${error}`);
  process.exit(1);
});

let server: Server;

const main = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    // eslint-disable-next-line no-console
    console.log(`🛢   Database is connected successfully`);

    seedSuperAdmin();

    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Application  listening on port ${config.port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('failed to database: ', error);
  }

  // Handle Unhandle Rejection
  process.on('unhandledRejection', error => {
    console.log(
      `Unhanlde Rejection is detected, we are closing server .......`
    );
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};
//
main();

// Hnadle SIGTERM

process.on('SIGTERM', () => {
  console.log('SIGTERM is receive');
  if (server) {
    server.close();
  }
});
