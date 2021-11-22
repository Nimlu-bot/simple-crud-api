let db = [];

const updateDB = (newDb) => {
  db = newDb;
  console.log(db);
  return true;
};
const getDB = () => db;
module.exports = { updateDB, getDB };
