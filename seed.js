const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite');

db.get(
  "SELECT name FROM sqlite_master WHERE type='table' AND name='Project'",
  (error, table) => {
    if (error) {
      throw new Error(error);
    }
    if (table) {
      db.run(
        `INSERT INTO Project (name, description, category, technologies, link) VALUES ('Project 1', 'Description 1', 'Category 1', 'Technology 1', 'Link 1')`
      );
      db.run(
        `INSERT INTO Project (name, description, category, technologies, link) VALUES ('Project 2', 'Description 2', 'Category 2', 'Technology 2', 'Link 2')`
      );
    }
  }
);
