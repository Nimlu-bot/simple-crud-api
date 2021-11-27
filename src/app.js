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

const app = http.createServer(async (req, res) => {
  try {
    const id = validateUrl(req.url);
    if (!id) {
      if (req.method === 'GET') {
        const persons = getAll();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(persons));
        res.end();
      } else if (req.method === 'POST') {
        const data = await getReqData(req);
        validate(data);
        const person = addPerson(data);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(person));
        res.end();
      } else throw new NotFoundError('Route not found');
    } else if (req.method === 'GET') {
      const person = getPerson(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(person));
      res.end();
    } else if (req.method === 'PUT') {
      const data = await getReqData(req);
      validate(data);
      const person = changePerson(data, id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(person));
      res.end();
    } else if (req.method === 'DELETE') {
      const isDeleted = deletePerson(id);
      if (isDeleted) {
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end();
      }
    } else {
      throw new NotFoundError('Route not found');
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
});

module.exports = { app };
