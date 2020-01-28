const http = require('http');
const app = require('./app');

const server = http.createServer(app);
const PORT = 8340;

server.listen(PORT, () => {
  console.log(`server is listening on PORT ${PORT}`);
});