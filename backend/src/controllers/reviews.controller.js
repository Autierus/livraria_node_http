const ReviewsRepository = require("../repositories/reviews.repository");

class ReviewsController {
    constructor() {
        this.reviewsRepository = new ReviewsRepository();
    }

    async listarReviews(req, res, next) {
        try {
            const reviews = await this.reviewsRepository.findAll();
            res.status(200).json(reviews);
        } catch (erro) {
            next(erro);
        }
    }

    async listarPorLivro(req, res, next) {
        const livroId = parseInt(req.params.livroId, 10);

        try {
            const reviews = await this.reviewsRepository.findByLivroId(livroId);
            res.status(200).json(reviews);
        } catch (erro) {
            console.error(erro);
            next(erro);
        }
    }

    async buscarReviewPorId(req, res, next) {
        const id = parseInt(req.params.id, 10);

        try {
            const review = await this.reviewsRepository.findById(id);

            if (!review) {
                return res.status(404).json({ erro: "Review não encontrada" });
            }

            res.status(200).json(review);
        } catch (erro) {
            next(erro);
        }
    }

    async criarReview(req, res, next) {
        try {
            const { livro_id, user_id, nota, comentario } = req.body;

            const novaReview = await this.reviewsRepository.create({
                livro_id: parseInt(livro_id, 10),
                user_id: parseInt(user_id, 10),  // agora usa o valor enviado no body
                rating: parseInt(nota, 10),      // converte "nota" para "rating"
                comentario
            });

            res.status(201).json({
                mensagem: "Review criada com sucesso",
                data: novaReview
            });
        } catch (erro) {
            console.error("[ERRO AO CRIAR REVIEW]", erro);
            next(erro);
        }
    }

    async atualizarReview(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const { livro_id, user_id, nota, comentario } = req.body;

            const reviewAtualizada = await this.reviewsRepository.update(id, {
                livro_id: parseInt(livro_id, 10),
                user_id: parseInt(user_id, 10),
                rating: parseInt(nota, 10),
                comentario
            });

            res.status(200).json({
                mensagem: "Review atualizada com sucesso",
                data: reviewAtualizada
            });
        } catch (erro) {
            console.error("[ERRO AO ATUALIZAR REVIEW]", erro);
            next(erro);
        }
    }

    async removerReview(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);

            const reviewRemovida = await this.reviewsRepository.delete(id);

            res.status(200).json({
                mensagem: "Review removida com sucesso",
                data: reviewRemovida
            });
        } catch (erro) {
            console.error("[ERRO AO REMOVER REVIEW]", erro);
            next(erro);
        }
    }
}

module.exports = ReviewsController;
