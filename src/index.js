const { PORT } = require('./config');
const server = require('./app');

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
