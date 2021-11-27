const uuid = require('uuid').v4;

class Person {
  constructor({ id = uuid(), name = 'Name', age = 11, hobbies = [] } = {}) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.hobbies = hobbies;
  }
}
module.exports = { Person };
