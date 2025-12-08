const RepositoryBase = require("./repository.interface");
const db = require("../database/sqlite");
const Favorite = require("../models/favorite.model");

class FavoritesRepository extends RepositoryBase {
    constructor() {
        super();
    }

    async findAllByUser(user_id) {
        const rows = db.all(
            "SELECT id, user_id, book_id FROM favorites WHERE user_id = ? ORDER BY id ASC",
            [user_id]
        );

        return rows.map(row => Favorite.fromJSON(row));
    }

    async isFavorite(user_id, book_id) {
        const row = db.get(
            "SELECT id, user_id, book_id FROM favorites WHERE user_id = ? AND book_id = ?",
            [user_id, book_id]
        );

        return row ? Favorite.fromJSON(row) : null;
    }

    async addFavorite(user_id, book_id) {
        const existing = await this.isFavorite(user_id, book_id);
        if (existing) return existing;

        const favorite = new Favorite({ id: null, user_id, book_id });

        const result = db.run(
            "INSERT INTO favorites (user_id, book_id) VALUES (?, ?)",
            [favorite.user_id, favorite.book_id]
        );

        return this.findById(result.lastInsertRowid);
    }

    async removeFavorite(user_id, book_id) {
        const existing = await this.isFavorite(user_id, book_id);

        if (!existing) {
            const error = new Error("Favorito não encontrado");
            error.statusCode = 404;
            throw error;
        }

        db.run(
            "DELETE FROM favorites WHERE user_id = ? AND book_id = ?",
            [user_id, book_id]
        );

        return existing;
    }

    async findById(id) {
        const row = db.get(
            "SELECT id, user_id, book_id FROM favorites WHERE id = ?",
            [id]
        );

        return row ? Favorite.fromJSON(row) : null;
    }
}

module.exports = FavoritesRepository;
