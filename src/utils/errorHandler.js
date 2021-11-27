const { InvalidError, NotFoundError } = require('./erros');

const errorHandler = (error, _, res) => {
  console.log(error.message);
  if (error instanceof InvalidError) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
  } else if (error instanceof NotFoundError) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
  } else {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    error.message = 'Internal server error';
  }
  res.write(JSON.stringify({ message: `${error.message}` }));
  res.end();
};

module.exports = { errorHandler };
