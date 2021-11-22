const { InvalidError } = require('./erros');

const validate = (data) => {
  if (
    !data.hasOwnProperty('name') ||
    !data.hasOwnProperty('age') ||
    !data.hasOwnProperty('hobbies')
  )
    throw new InvalidError('data does not contain required fields');
};
module.exports = { validate };
