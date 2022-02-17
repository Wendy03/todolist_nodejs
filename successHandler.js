function successHandler(res, todos) {
  const headers = {
    'Access-Control-Request-Headers':
      'Content-type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Request-Method': 'PATCH, POST, GET, OPTIONS, DELETE',
    'Content-type': 'application/json',
  };
  res.writeHead('200', headers);
  res.write(
    JSON.stringify({
      status: 'success',
      data: todos,
    })
  );
  res.end();
}

module.exports = successHandler;
