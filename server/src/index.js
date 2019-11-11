const cookieParser = require('cookie-parser');

const { jwtDecoder } = require('./middlewars/auth');
const createServer = require('./loaders/server');

const { API_PORT, FRONTEND_URL_DEV, NODE_ENV } = process.env;

const server = createServer();

// Middlewars
server.express.use(cookieParser());

// decode the JWT so we can get the user Id on each request
server.express.use(jwtDecoder);

server.start(
  {
    port: API_PORT,
    cors: {
      credentials: true,
      origin: FRONTEND_URL_DEV,
    },
    debug: NODE_ENV === 'development',
  },
  (listener) => {
    console.log(`Server is now running on port http://localhost:${listener.port}`);
  },
);
