const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite')

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Project (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            category TEXT NOT NULL,
            technologies TEXT NOT NULL,
            link TEXT NOT NULL
        )
    `)
});
