let db = [];

const updateDB = (newDb) => {
  db = newDb;
  return true;
};
const getDB = () => db;
module.exports = { updateDB, getDB };
