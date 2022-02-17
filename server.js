const http = require('http');
const port = 3000;
const successHandler = require('./successHandler');
const errorHandler = require('./errorHandler');
const { v4: uuidv4 } = require('uuid');

const todos = [];

const requestListener = (req, res) => {
  successHandler(res, todos);
};
const server = http.createServer(requestListener);
server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
