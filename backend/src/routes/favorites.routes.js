const express = require("express");
const router = express.Router();

// Controller
const FavoritesController = require("../controllers/favorites.controller");
const favoritesController = new FavoritesController();

// Middlewares
const { requireAuth } = require("../middlewares/auth"); // middleware de autenticação
const { validarParamId } = require("../middlewares/validar/favorites.validar");

// Todas as rotas de favoritos exigem usuário logado
router.use(requireAuth);

// Lista todos os favoritos do usuário logado
router.get("/", favoritesController.listarFavoritos.bind(favoritesController));

// Adiciona um livro aos favoritos (passando o bookId na URL)
router.post("/:bookId", validarParamId, favoritesController.adicionarFavorito.bind(favoritesController));

// Remove um livro dos favoritos
router.delete("/:bookId", validarParamId, favoritesController.removerFavorito.bind(favoritesController));

// Verifica se um livro é favorito (opcional)
router.get("/check/:bookId", validarParamId, favoritesController.verificarFavorito.bind(favoritesController));

module.exports = router;
