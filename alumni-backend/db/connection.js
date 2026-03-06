const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'db', 'database.db');

// sql.js loads the entire DB into memory from the .db file.
// We expose a thin wrapper that mimics the better-sqlite3 API
// (.prepare().all() / .prepare().get() / .prepare().run())
// so the route files need zero changes.

let _db = null;

async function getDb() {
  if (_db) return _db;
  const SQL = await initSqlJs();
  const buffer = fs.readFileSync(DB_PATH);
  _db = new SQL.Database(buffer);
  console.log('✅  SQLite database loaded via sql.js');
  return _db;
}

// Synchronous helper used by routes — works because we call initDb()
// at server startup and await it before listening.
function getDbSync() {
  if (!_db) throw new Error('Database not initialised yet — call initDb() first');
  return _db;
}

// Thin compatibility shim: db.prepare(sql).all(...params)  /  .get(...params)  /  .run(...params)
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
    // Allow direct sql execution (used nowhere currently but handy)
    exec(sql) {
      getDbSync().run(sql);
    },
  };
}

const db = makeDb();

module.exports = { db, getDb };
