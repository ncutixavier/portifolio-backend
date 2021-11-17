const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./test.sqlite');

describe('Welcome API', () => {
  it('should get welcome message', () => {
    return request(app)
      .get('/')
      .expect(200)
      .then((res) => {
        expect(res.body.message).to.includes('Welcome to the API');
      });
  });
});
