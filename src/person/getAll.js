const { getDB } = require('./person.db');

const getAll = () => getDB();

module.exports = { getAll };
