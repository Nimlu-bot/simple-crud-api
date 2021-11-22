const { NotFoundError } = require('../utils/erros');
const { getDB } = require('./person.db');

const getPerson = (id) => {
  const db = getDB();
  const person = db.find((el) => el.id === id);
  if (person) return person;
  throw new NotFoundError(`person with id ${id} not found`);
};

module.exports = { getPerson };
