const { Person } = require('./Person');
const { getDB } = require('./person.db');

const addPerson = (data) => {
  const db = getDB();
  const newPerson = new Person(data);
  db.push(newPerson);
  return newPerson;
};

module.exports = addPerson;
