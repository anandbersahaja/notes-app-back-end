const Hapi = require("@hapi/hapi");
const routes = require("./routes");

const PORT = 5000;
// const HOST = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0';

const init = async () => {
  const server = Hapi.server({
    port: PORT,
    host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
