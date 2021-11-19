const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.sqlite');

function seedProjectDatabase() {
  db.serialize(() => {
    db.run('DROP TABLE IF EXISTS Project');
    db.run(`
            CREATE TABLE Project (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                category TEXT NOT NULL,
                technologies TEXT NOT NULL,
                link TEXT NOT NULL,
                github_url TEXT NOT NULL
            )
        `);
    db.run(
      `INSERT INTO Project (name, description, category, technologies, link, github_url) VALUES ('Project 1', 'Description 1', 'Category 1', 'Technology 1', 'Link 1', 'github_url 1')`
    );
    db.run(
      `INSERT INTO Project (name, description, category, technologies, link, github_url) VALUES ('Project 2', 'Description 2', 'Category 2', 'Technology 2', 'Link 2', 'github_url 2')`
    );
    db.run(
      `INSERT INTO Project (name, description, category, technologies, link, github_url) VALUES ('Project 3', 'Description 3', 'Category 3', 'Technology 3', 'Link 3', 'github_url 3')`
    );
  });
}

module.exports = { seedProjectDatabase };
