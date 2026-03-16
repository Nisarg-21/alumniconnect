const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'db', 'database.db');



let _db = null;

async function getDb() {
  if (_db) return _db;
  const SQL = await initSqlJs();
  const buffer = fs.readFileSync(DB_PATH);
  _db = new SQL.Database(buffer);
  console.log('✅  SQLite database loaded via sql.js');
  return _db;
}


function getDbSync() {
  if (!_db) throw new Error('Database not initialised yet — call initDb() first');
  return _db;
}

function makeDb() {
  return {
    prepare(sql) {
      return {
        all(...params) {
          const db = getDbSync();
          const stmt = db.prepare(sql);
          const results = stmt.getAsObject ? [] : [];
          stmt.bind(params.flat());
          while (stmt.step()) {
            results.push(stmt.getAsObject());
          }
          stmt.free();
          return results;
        },
        get(...params) {
          const db = getDbSync();
          const stmt = db.prepare(sql);
          stmt.bind(params.flat());
          const row = stmt.step() ? stmt.getAsObject() : undefined;
          stmt.free();
          return row;
        },
        run(...params) {
          const db = getDbSync();
          db.run(sql, params.flat());
        },
      };
    },
    exec(sql) {
      getDbSync().run(sql);
    },
  };
}

const db = makeDb();

module.exports = { db, getDb };
