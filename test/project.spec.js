process.env.PORT = 3010;
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');
const sqlite3 = require('sqlite3');
const seed = require('../seed');
// const db = new sqlite3.Database('../db/test.sqlite');
const prodDB = new sqlite3.Database('./db/database.sqlite');

describe('WELCOME API', () => {
  it('should get welcome message', () => {
    return request(app)
      .get('/')
      .expect(200)
      .then((res) => {
        expect(res.body.message).to.includes('Welcome to the API');
      });
  });
});

describe('=> PROJECT API', () => {
  it('should return all projects', () => {
    before((done) => {
      seed.seedProjectsTable(done);
    });
    return request(app)
      .get('/api/projects')
      .expect(200)
      .then((res) => {
        const projects = res.body;
        expect(projects.find((project) => project.id === 1)).to.exist;
        expect(projects.find((project) => project.id === 2)).to.exist;
      })
  });

  it('should return a project by id', () => {
    return request(app)
      .get('/api/projects/1')
      .expect(200)
      .then((res) => {
        const project = res.body;
        expect(project.id).to.equal(1);
        expect(project.name).to.equal('Project 1');
      })
  });

  it('should return 404 when project not found', () => {
    return request(app)
      .get('/api/projects/3000')
      .expect(404);
  })
});
