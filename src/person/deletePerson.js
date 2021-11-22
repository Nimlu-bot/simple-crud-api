const { NotFoundError } = require('../utils/erros');
const { updateDB, getDB } = require('./person.db');

const deletePerson = (id) => {
  const db = getDB();
  const person = db.find((el) => el.id === id);
  if (!person) throw new NotFoundError(`person with id ${id} not found`);
  const newDb = db.filter((el) => el.id !== id);
  const isUpdated = updateDB(newDb);
  if (isUpdated) return person;
  throw new Error('somthing wrong in updateDB');
};

module.exports = { deletePerson };
