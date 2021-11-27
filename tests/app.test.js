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
  describe('1 scenario correct order', () => {
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
  describe('2 scenario 400 error', () => {
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
  describe('3 scenario 500 error', () => {
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
  describe('4 scenario  adding 2 persons', () => {
    let response;
    let id1;
    let id2;
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
          id1 = res.body[0].id;
          id2 = res.body[1].id;
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toBe(2);
          expect(id1).not.toBe(id2);
        });
    });
    it('should delete person1', async () => {
      await request.delete(`/person/${id1}`).expect(204);
    });
    it('should delete person2', async () => {
      await request.delete(`/person/${id2}`).expect(204);
    });
  });

  describe('5 scenario 404 error', () => {
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

    const wrongPersonID = 'fcd3d5ba-c965-498b-9e15-6377d14e2dd7';
    it('should dont change person data if id incorrect', async () => {
      await request
        .put(`/person/${wrongPersonID}`)
        .set('Accept', 'application/json')
        .send(PERSON_UPDATED_DATA)
        .expect(404)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body.message).toBe(
            'person with id fcd3d5ba-c965-498b-9e15-6377d14e2dd7 not found'
          );
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
});
