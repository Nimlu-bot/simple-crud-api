const { PORT } = require('./config');
const { app } = require('./app');

app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
