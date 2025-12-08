// src/database/sqlite.js
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const DB_FILE = process.env.SQLITE_DB_FILE || path.join(__dirname, '../data/livraria.db');
fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });

// Singleton
let db;
function getDb() {
    if (!db) {
        db = new Database(DB_FILE);
        db.pragma('foreign_keys = ON');
    }
    return db;
}

function run(sql, params = []) {
    return getDb().prepare(sql).run(...params);
}

function get(sql, params = []) {
    return getDb().prepare(sql).get(...params);
}

function all(sql, params = []) {
    return getDb().prepare(sql).all(...params);
}

function query(sql, params = []) {
    const rows = getDb().prepare(sql).all(...params);
    if (rows.length === 0) return null;
    if (rows.length === 1) return rows[0];
    return rows;
}

function init() {
    // Tabela de livros
    run(`
        CREATE TABLE IF NOT EXISTS livros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            autor TEXT NOT NULL,
            categoria TEXT NOT NULL,
            ano INTEGER NOT NULL,
            editora TEXT DEFAULT ''
        )
    `);

    // Tabela de users
    run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Tabela de reviews
    run(`
        CREATE TABLE IF NOT EXISTS reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            livro_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
            comentario TEXT DEFAULT '',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (livro_id) REFERENCES livros(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `);

    // Tabela de favoritos
    run(`
        CREATE TABLE IF NOT EXISTS favorites (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            book_id INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (book_id) REFERENCES livros(id) ON DELETE CASCADE,
            UNIQUE(user_id, book_id)
        )
    `);

    console.log('Banco de dados SQLite inicializado (livros, users, reviews, favorites).');
}

module.exports = { getDb, run, get, all, query, init };
