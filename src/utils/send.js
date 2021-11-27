const send = (res, code, body) => {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  if (body) res.write(JSON.stringify(body));
  res.end();
};

module.exports = { send };
