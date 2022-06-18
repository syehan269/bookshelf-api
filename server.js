'use-strict';

import Hapi from '@hapi/hapi';
import routes from './routes.js';
import dotenv from 'dotenv';

dotenv.config();

const init = async () => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.SERVER_PORT || 5000,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (error) => {
  console.log(error);
  process.exit(1);
});

init();
