const supertest = require('supertest');
const { PORT } = require('../src/config');

const PERSON_DATA = {
  name: 'TEST_USER',
  age: 1,
  hobbies: ['hobbi1', 'hobbi2'],
};
const PERSON_UPDATED_DATA = {
  name: 'TEST_USER2',
  age: 2,
  hobbies: ['hobbi1', 'hobbi2'],
};
const host = `localhost:${PORT}`;

describe('1 scenario', () => {
  const request = supertest(host);

  describe('GET', () => {
    it('should get all users', async () => {
      const personResponse = await request
        .get('/person')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/);
      // debug(usersResponse.body);
      expect(personResponse.status).toBe(200);
      expect(Array.isArray(personResponse.body)).toBeTruthy();
    });
    // it('should get user by ID', async () => {
    //   const personResponse = await request
    //     .get('/person/')
    //     .set('Accept', 'application/json')
    //     .expect(200)
    //     .expect('Content-Type', /json/);
    //   // debug(usersResponse.body);
    //   expect(personResponse.status).toBe(200);
    //   expect(Array.isArray(personResponse.body)).toBeTruthy();
    // });
  });

  describe('POST', () => {
    it('should create user with id', async () => {
      let personId;

      await request
        .post('/person')
        .set('Accept', 'application/json')
        .send(PERSON_DATA)
        .expect(201)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body.id).toMatch(/[a-z]*/);
          personId = res.body.id;
        });

      const personResponse = await request
        .get('/person')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/);
      expect(personResponse.status).toBe(200);
      expect(personResponse.body).toBeInstanceOf(Object);
      expect(personResponse.body[0].id).toEqual(personId);

      await request.delete(`/person/${personId}`);
    });
  });

  describe('PUT', () => {
    it('should update user with id', async () => {
      let personId;

      await request
        .post('/person')
        .set('Accept', 'application/json')
        .send(PERSON_DATA)
        .expect(201)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body.id).toMatch(/[a-z]*/);
          personId = res.body.id;
        });
      await request
        .put(`/person/${personId}`)
        .set('Accept', 'application/json')
        .send(PERSON_UPDATED_DATA)
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body.id).toMatch(/[a-z]*/);
          expect(res.body.name).toBe('TEST_USER2');
        });

      const personResponse = await request
        .get('/person')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/);
      expect(personResponse.status).toBe(200);
      expect(personResponse.body).toBeInstanceOf(Object);
      expect(personResponse.body[0].id).toEqual(personId);

      await request.delete(`/person/${personId}`);
    });
  });
});
