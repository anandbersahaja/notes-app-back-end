const Hapi = require("@hapi/hapi");
const routes = require("./routes");

const PORT = 3000;
const HOST = "localhost";

const init = async () => {
  const server = Hapi.server({
    port: PORT,
    host: HOST,
    routes: {
      cors: {
        origin: ["http://notesapp-v1.dicodingacademy.com"],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
