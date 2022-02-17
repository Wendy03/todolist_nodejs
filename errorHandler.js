function errorHandler(res) {
  const headers = {
    'Access-Control-Request-Headers':
      'Content-type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Request-Method': 'PATCH, POST, GET, OPTIONS, DELETE',
    'Content-type': 'application/json',
  };
  res.writeHead('400', headers);
  res.write(
    JSON.stringify({
      status: 'false',
      message: '無此網頁 or 資料錯誤',
    })
  );
  res.end();
}

module.exports = errorHandler;
