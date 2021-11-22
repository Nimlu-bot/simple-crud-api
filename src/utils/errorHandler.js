const errorHandler = (error, _, res) => {
  console.log(error.message);
  if (error.name === 'InvalidError') {
    res.writeHead(400, { 'Content-Type': 'application/json' });
  } else if (error.name === 'NotFoundError') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
  } else {
    res.writeHead(500, { 'Content-Type': 'application/json' });
  }
  res.end(JSON.stringify({ message: `${error}` }));
};

module.exports = { errorHandler };
