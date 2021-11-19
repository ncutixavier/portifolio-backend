const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(
  process.env.TEST_DATABASE || './db/database.sqlite'
);
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

projectRouter.post('/', (req, res, next) => {
  const { name, description, category, technologies, link, github_url } =
    req.body;
  if (
    !name ||
    !description ||
    !category ||
    !technologies ||
    !link ||
    !github_url
  ) {
    return res.status(400).send('Missing required fields');
  }
  db.run(
    `INSERT INTO Project (name, description, category, technologies, link, github_url) VALUES ('${name}', '${description}', '${category}', '${technologies}', '${link}', '${github_url}')`,
    function (err) {
      if (err) {
        next(err);
        return;
      }
      db.get(`SELECT * FROM Project WHERE id = ${this.lastID}`, (err, row) => {
        if (err) {
          next(err);
          return;
        }
        res.status(201).send(row);
      });
    }
  );
});

projectRouter.put('/:projectId', (req, res, next) => {
  const { name, description, category, technologies, link, github_url } =
    req.body;
  if (
    !name ||
    !description ||
    !category ||
    !technologies ||
    !link ||
    !github_url
  ) {
    return res.status(400).send('Missing required fields');
  }
  db.run(
    `UPDATE Project SET name = '${name}', description = '${description}', category = '${category}', technologies = '${technologies}', link = '${link}', github_url = '${github_url}' WHERE id = ${req.project.id}`,
    function (err) {
      if (err) {
        next(err);
        return;
      }
      db.get(`SELECT * FROM Project WHERE id = ${req.project.id}`, (err, row) => {
        if (err) {
          next(err);
          return;
        }
        res.status(200).send(row);
      });
    }
  );
});

projectRouter.delete('/:projectId', (req, res, next) => {
  db.run(`DELETE FROM Project WHERE id = ${req.project.id}`, function (
    err
  ) {
    if (err) {
      next(err);
      return;
    }
    res.sendStatus(204);
  });
});

module.exports = projectRouter;
