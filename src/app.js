const http = require('http');
const { errorHandler } = require('./utils/errorHandler');
const validateUrl = require('./utils/validateUrl');

const { getReqData } = require('./utils/getData');

const getAll = require('./person/getAll');
const addPerson = require('./person/addPerson');
const { getPerson } = require('./person/getPerson');
const { deletePerson } = require('./person/deletePerson');
const { changePerson } = require('./person/changePerson');
const { validate } = require('./utils/validateData');
const { NotFoundError } = require('./utils/erros');

const server = http.createServer(async (req, res) => {
  try {
    const id = validateUrl(req.url);
    console.log(id);
    if (!id) {
      if (req.method === 'GET') {
        const persons = getAll();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(persons));
        res.end();
      } else if (req.method === 'POST') {
        const data = await getReqData(req);
        validate(JSON.parse(data));
        const person = addPerson(JSON.parse(data));
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
      console.log('hi');
      const data = await getReqData(req);
      const person = changePerson(JSON.parse(data), id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(person));
      res.end();
    } else if (req.method === 'DELETE') {
      const person = deletePerson(id);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(person));
      res.end();
    } else {
      throw new NotFoundError('Route not found');
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
});

module.exports = server;
