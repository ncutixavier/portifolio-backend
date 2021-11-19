process.env.PORT = 3111;
process.env.TEST_DATABASE = './db/database.sqlite';
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');
const sqlite3 = require('sqlite3');
const seed = require('../seed');

const db = new sqlite3.Database(process.env.TEST_DATABASE);
const prodDb = new sqlite3.Database('./db/database.sqlite');

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

describe('Test Tables', () => {
  it('Project should exist', function (done) {
    prodDb.get(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='Project'",
      (error, table) => {
        if (error || !table) {
          done(new Error(error || 'Project table not found'));
        }
        if (table) {
          done();
        }
      }
    );
  });
});

describe('=> PROJECT API', () => {
  let newProject = {
    name: 'New Project',
    description: 'This is project 3',
    category: 'Web Development',
    technologies: 'HTML, CSS, JavaScript, Node.js, Express, SQLite3',
    link: 'Linkk',
    github_url: 'Github'
  };
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
      });
  });

  it('should return a project by id', () => {
    return request(app)
      .get('/api/projects/1')
      .expect(200)
      .then((res) => {
        const project = res.body;
        expect(project.id).to.equal(1);
        expect(project.name).to.equal('Project 1');
      });
  });

  it('should return 404 when project not found', () => {
    return request(app).get('/api/projects/3000').expect(404);
  });

  it('should create a new project', () => {
    return request(app)
      .post('/api/projects')
      .send(newProject)
      .then(() => {
        db.all('SELECT * FROM projects', (err, rows) => {
          const result = rows.find(
            (project) => project.name === newProject.name
          );
          expect(result).to.exist;
          expect(result.id).to.exist;
          expect(result.name).to.equal(newProject.name);
        });
      });
  });

  it('should return 400', () => {
    return request(app).post('/api/projects').send({}).expect(400);
  });

  it('should update a project', () => {
    return request(app)
      .put('/api/projects/1')
      .send(newProject)
      .then(() => {
        db.get(
          'SELECT * FROM projects WHERE id = 1',
          (err, row) => {
            expect(row.name).to.equal(newProject.name);
          }
        );
      });
  });

  it('should delete a project', () => {
    return request(app)
      .delete('/api/projects/1')
      .expect(204)
      .then(() => {
        db.get('SELECT * FROM projects WHERE id = 1', (err, row) => {
          expect(row).to.be.null;
        });
      });
  });
});
