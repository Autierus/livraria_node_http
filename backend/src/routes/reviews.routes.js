const express = require("express");
const router = express.Router();

// Controllers
const ReviewsController = require("../controllers/reviews.controller");
const reviewsController = new ReviewsController();

// Middlewares
const { validarParamId, validarLivroId } = require("../middlewares/validar/reviews.validar");

// Listar reviews de um livro específico
router.get(
    "/livro/:livroId",
    validarLivroId,
    reviewsController.listarPorLivro.bind(reviewsController)
);

// Listar TODAS as reviews
router.get(
    "/",
    reviewsController.listarReviews.bind(reviewsController)
);

// Buscar review por ID
router.get(
    "/:id",
    validarParamId,
    reviewsController.buscarReviewPorId.bind(reviewsController)
);

// Criar review
router.post(
    "/",
    reviewsController.criarReview.bind(reviewsController)
);

// Atualizar review
router.put(
    "/:id",
    validarParamId,
    reviewsController.atualizarReview.bind(reviewsController)
);

// Remover review
router.delete(
    "/:id",
    validarParamId,
    reviewsController.removerReview.bind(reviewsController)
);

module.exports = router;
