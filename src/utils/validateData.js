const { InvalidError } = require('./erros');

const validate = (data) => {
  if (
    !data.hasOwnProperty('name') ||
    !data.hasOwnProperty('age') ||
    !data.hasOwnProperty('hobbies')
  )
    throw new InvalidError('data does not contain required fields');
  if (typeof data.name !== 'string')
    throw new InvalidError('name must be a string');
  if (typeof data.age !== 'number')
    throw new InvalidError('age must be a number');
  if (!Array.isArray(data.hobbies))
    throw new InvalidError('hobbies must be an array');
};
module.exports = { validate };
