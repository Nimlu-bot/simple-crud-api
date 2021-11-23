const errorHandler = (error, _, res) => {
  console.log(error.message);
  if (error.name === 'InvalidError') {
    res.writeHead(400, { 'Content-Type': 'application/json' });
  } else if (error.name === 'NotFoundError') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
  } else {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    error.message = 'Internal server error';
  }
  res.end(JSON.stringify({ message: `${error.message}` }));
};

module.exports = { errorHandler };
