const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite');
const projectRouter = require('express').Router();

projectRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM Project', (err, rows) => {
    if (err) {
      next(err);
      return;
    }
    res.send(rows);
  });
});

projectRouter.param('projectId', (req, res, next, id) => {
  db.get(`SELECT * FROM Project WHERE id = ${id}`, (err, row) => {
    if (err) {
      next(err);
      return;
    }
    if (row) {
      req.project = row;
      return next();
    }
    res.sendStatus(404);
  });
});

projectRouter.get('/:projectId', (req, res, next) => {
  res.send(req.project);
});

module.exports = projectRouter;
