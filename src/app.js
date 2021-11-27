const http = require('http');
const { errorHandler } = require('./utils/errorHandler');
const { validateUrl } = require('./utils/validateUrl');

const { getReqData } = require('./utils/getData');

const { getAll } = require('./person/getAll');
const { addPerson } = require('./person/addPerson');
const { getPerson } = require('./person/getPerson');
const { deletePerson } = require('./person/deletePerson');
const { changePerson } = require('./person/changePerson');
const { validate } = require('./utils/validateData');
const { NotFoundError } = require('./utils/erros');
const { send } = require('./utils/send');

const app = http.createServer(async (req, res) => {
  try {
    const id = validateUrl(req.url);

    if (!id) {
      if (req.method === 'GET') {
        const persons = getAll();

        send(res, 200, persons);
      } else if (req.method === 'POST') {
        const data = await getReqData(req);

        validate(data);
        const person = addPerson(data);
        send(res, 201, person);
      } else throw new NotFoundError('Route not found');
    } else if (req.method === 'GET') {
      const person = getPerson(id);

      send(res, 200, person);
    } else if (req.method === 'PUT') {
      const data = await getReqData(req);

      validate(data);

      const person = changePerson(data, id);

      send(res, 200, person);
    } else if (req.method === 'DELETE') {
      const isDeleted = deletePerson(id);

      if (isDeleted) send(res, 204);
    } else {
      throw new NotFoundError('Route not found');
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
});

module.exports = { app };
