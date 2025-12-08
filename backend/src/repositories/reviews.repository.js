const RepositoryBase = require("./repository.interface");
const db = require("../database/sqlite");
const Review = require("../models/review.model");

class ReviewsRepository extends RepositoryBase {
    constructor() {
        super();
    }

    /** Lista todas as reviews */
    async findAll() {
        const rows = db.all(
            `SELECT id, livro_id, user_id, rating, comentario, created_at
             FROM reviews
             ORDER BY created_at DESC`
        );

        return rows.map(row => Review.fromJSON(row));
    }

    /** Lista reviews por livro */
    async findByLivroId(livroId) {
        const rows = db.all(
            `SELECT id, livro_id, user_id, rating, comentario, created_at
             FROM reviews
             WHERE livro_id = ?
             ORDER BY created_at DESC`,
            [livroId]
        );

        return rows.map(row => Review.fromJSON(row));
    }

    /** Busca review por ID */
    async findById(id) {
        const row = db.get(
            `SELECT id, livro_id, user_id, rating, comentario, created_at
             FROM reviews
             WHERE id = ?`,
            [id]
        );

        return row ? Review.fromJSON(row) : null;
    }

    /** Cria uma nova review */
    async create(reviewData) {
        const novaReview = new Review({
            id: null,
            livro_id: reviewData.livro_id,
            user_id: reviewData.user_id,
            rating: reviewData.rating,
            comentario: reviewData.comentario
        });

        const result = db.run(
            `INSERT INTO reviews (livro_id, user_id, rating, comentario)
             VALUES (?, ?, ?, ?)`,
            [
                novaReview.livro_id,
                novaReview.user_id,
                novaReview.rating,
                novaReview.comentario
            ]
        );

        return this.findById(result.lastInsertRowid);
    }

    /** Atualiza uma review */
    async update(id, dadosAtualizados) {
        const existente = await this.findById(id);

        if (!existente) {
            const error = new Error("Review não encontrada");
            error.statusCode = 404;
            throw error;
        }

        const atualizado = new Review({
            ...existente.toJSON(),
            ...dadosAtualizados
        });

        db.run(
            `UPDATE reviews
             SET rating = ?, comentario = ?
             WHERE id = ?`,
            [
                atualizado.rating,
                atualizado.comentario,
                id
            ]
        );

        return this.findById(id);
    }

    /** Remove review */
    async delete(id) {
        const existente = await this.findById(id);

        if (!existente) {
            const error = new Error("Review não encontrada");
            error.statusCode = 404;
            throw error;
        }

        db.run(`DELETE FROM reviews WHERE id = ?`, [id]);
        return existente;
    }
}

module.exports = ReviewsRepository;
