const { NotFoundError } = require('../utils/erros');
const { getDB, updateDB } = require('./person.db');

const changePerson = (person, id) => {
  const db = getDB();
  const foundPerson = db.find((el) => el.id === id);
  if (!foundPerson) throw new NotFoundError(`person with id ${id} not found`);
  const newDB = db.map((el) => (el.id === id ? { ...el, ...person } : el));
  updateDB(newDB);
  return { ...foundPerson, ...person };
};

module.exports = { changePerson };
