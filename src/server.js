const Hapi = require('@hapi/hapi');
const routes = require('./routes');


const serverInit = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server has running in ${server.info.uri}`);
};

serverInit();
