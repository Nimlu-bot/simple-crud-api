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

describe('E2E tests', () => {
  const request = supertest(host);
  describe('1 scenario ', () => {
    let personId;
    let response;

    it('should check array of persons is empty', async () => {
      await request
        .get('/person')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toBe(0);
        });
    });
    it('should create person ', async () => {
      await request
        .post('/person')
        .set('Accept', 'application/json')
        .send(PERSON_DATA)
        .expect(201)
        .expect('Content-Type', /json/)
        .then((res) => {
          response = { ...PERSON_DATA, id: res.body.id };
          expect(res.body.id).toMatch(/[a-z]*/);
          expect(res.body).toEqual(response);
          personId = res.body.id;
        });
    });
    it('should check created person', async () => {
      await request
        .get(`/person/${personId}`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).toEqual(response);
        });
    });
    it('should change person data', async () => {
      await request
        .put(`/person/${personId}`)
        .set('Accept', 'application/json')
        .send(PERSON_UPDATED_DATA)
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body.id).toBe(personId);
          expect(res.body.name).toBe('TEST_USER2');
        });
    });
    it('should delete person', async () => {
      await request.delete(`/person/${personId}`).expect(204);
    });
    it('should check that person is deleted', async () => {
      await request
        .get(`/person/${personId}`)
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body.message).toBe(`person with id ${personId} not found`);
        });
    });
  });
  describe('2 scenario', () => {
    it('should check array of persons is empty', async () => {
      await request
        .get('/person')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toBe(0);
        });
    });
    it('should return 400 error if user data does not contain required fields', async () => {
      const INVALID_PERSON_DATA = { name: 'INVALID_USER' };
      await request
        .post('/person')
        .set('Accept', 'application/json')
        .send(INVALID_PERSON_DATA)
        .expect(400)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body.message).toBe(
            'data does not contain required fields'
          );
        });
    });
  });
  describe('3 scenario', () => {
    it('should check array of persons is empty', async () => {
      await request
        .get('/person')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toBe(0);
        });
    });

    it('should return 500 error if user data is string', async () => {
      const INVALID_PERSON_DATA = 'INVALID_PERSON';
      await request
        .post('/person')
        .set('Accept', 'application/json')
        .send(INVALID_PERSON_DATA)
        .expect(500)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body.message).toBe('Internal server error');
        });
    });
  });
  describe('4 scenario', () => {
    let personId;
    let response;
    it('should check array of persons is empty', async () => {
      await request
        .get('/person')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toBe(0);
        });
    });

    it('should create 2 persons ', async () => {
      await request
        .post('/person')
        .set('Accept', 'application/json')
        .send(PERSON_DATA)
        .expect(201)
        .expect('Content-Type', /json/)
        .then((res) => {
          response = { ...PERSON_DATA, id: res.body.id };
          expect(res.body.id).toMatch(/[a-z]*/);
          expect(res.body).toEqual(response);
        });

      await request
        .post('/person')
        .set('Accept', 'application/json')
        .send(PERSON_DATA)
        .expect(201)
        .expect('Content-Type', /json/)
        .then((res) => {
          response = { ...PERSON_DATA, id: res.body.id };
          expect(res.body.id).toMatch(/[a-z]*/);
          expect(res.body).toEqual(response);
        });
    });

    it('should check array of persons length is 2 and IDs are different', async () => {
      await request
        .get('/person')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toBe(2);
          expect(res.body[0].id).not.toBe(res.body[1].id);
        });
    });
  });
});
