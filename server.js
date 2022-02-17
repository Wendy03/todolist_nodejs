const http = require('http');
const port = 3000;
const successHandler = require('./successHandler');
const errorHandler = require('./errorHandler');
const { v4: uuidv4 } = require('uuid');

const todos = [];

const requestListener = (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  if (req.url === '/todos' && req.method === 'GET') {
    successHandler(res, todos);
  } else if (req.url === '/todos' && req.method === 'POST') {
    req.on('end', () => {
      try {
        let title = JSON.parse(body).title;
        if (title !== undefined) {
          const todo = {
            title: title,
            id: uuidv4(),
          };
          todos.push(todo);
          successHandler(res, todos);
        } else {
          errorHandler(res);
        }
      } catch (e) {
        errorHandler(res);
      }
    });
  } else if (req.url === '/todos' && req.method === 'DELETE') {
    todos.length = 0;
    successHandler(res, todos);
  } else if (req.url.startsWith('/todos/') && req.method === 'DELETE') {
    const id = req.url.split('/').pop();
    const index = todos.findIndex((e) => e.id === id);
    if (index !== -1) {
      todos.splice(index, 1);
      successHandler(res, todos);
    }
  } else if (req.url.startsWith('/todos/') && req.method === 'PATCH') {
    req.on('end', () => {
      try {
        const todo = JSON.parse(body).title;
        const id = req.url.split('/').pop();
        const index = todos.findIndex((e) => e.id === id);
        if (todo !== undefined && index !== -1) {
          todos[index].title = todo;
          successHandler(res, todos);
        } else {
          errorHandler(res);
        }
      } catch (e) {
        errorHandler(res);
      }
    });
  } else if (req.url === '/todos' && req.method === 'OPTIONS') {
    successHandler(res);
  } else {
    errorHandler(res);
  }
};
const server = http.createServer(requestListener);
server.listen(process.env.PORT || port, () => {
  console.log(`http://localhost:${port}`);
});
