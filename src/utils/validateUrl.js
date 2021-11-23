const uuid = require('uuid');
const { InvalidError, NotFoundError } = require('./erros');

const validateUrl = (url) => {
  const [, endpoint, id, rest] = url.split('/');
  if (endpoint !== 'person') throw new NotFoundError('Route not found');
  if (rest) throw new NotFoundError('Route not found');
  if (!!id && !uuid.validate(id)) throw new InvalidError('id incorrect');
  return id;
};
module.exports = { validateUrl };
