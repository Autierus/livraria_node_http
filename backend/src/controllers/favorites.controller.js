const FavoritesRepository = require("../repositories/favorites.repository");

class FavoritesController {
    constructor() {
        this.favoritesRepository = new FavoritesRepository();
    }

    // GET /favorites
    async listarFavoritos(req, res, next) {
        try {
            const userId = req.session.userId;
            const favoritos = await this.favoritesRepository.findAllByUser(userId);
            res.status(200).json(favoritos);
        } catch (error) {
            next(error);
        }
    }

    // POST /favorites/:bookId
    async adicionarFavorito(req, res, next) {
        try {
            const userId = req.session.userId;
            const bookId = parseInt(req.params.bookId);

            const favorito = await this.favoritesRepository.addFavorite(userId, bookId);

            res.status(201).json({
                mensagem: "Livro adicionado aos favoritos",
                data: favorito
            });
        } catch (error) {
            next(error);
        }
    }

    // DELETE /favorites/:bookId
    async removerFavorito(req, res, next) {
        try {
            const userId = req.session.userId;
            const bookId = parseInt(req.params.bookId);

            const removido = await this.favoritesRepository.removeFavorite(userId, bookId);

            res.status(200).json({
                mensagem: "Livro removido dos favoritos",
                data: removido
            });
        } catch (error) {
            next(error);
        }
    }

    // GET /favorites/check/:bookId  (opcional)
    async verificarFavorito(req, res, next) {
        try {
            const userId = req.session.userId;
            const bookId = parseInt(req.params.bookId);

            const favorito = await this.favoritesRepository.isFavorite(userId, bookId);

            res.status(200).json({ favorito: !!favorito });
        } catch (error) {
            next(error);
        }
    }

    async buscarFavoritoPorId(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const favorito = await this.favoritesRepository.findById(id);
        if (!favorito) return res.status(404).json({ erro: "Favorito não encontrado" });
        res.status(200).json(favorito);
    } catch (error) {
        next(error);
    }
}
}

module.exports = FavoritesController;
