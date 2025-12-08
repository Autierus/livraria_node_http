
/**
 * Valida se o parâmetro :id é um número válido.
 */
const validarParamId = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ erro: "ID da review deve ser um número válido" });
    }
    next();
};

/**
 * Valida se o parâmetro :livroId é um número válido.
 * Necessário para rotas como GET /livros/:livroId/reviews
 */
const validarLivroId = (req, res, next) => {
    const livroId = parseInt(req.params.livroId);
    if (isNaN(livroId)) {
        return res.status(400).json({ erro: "ID do livro deve ser um número válido" });
    }
    next();
};

module.exports = {
    validarParamId,
    validarLivroId
};
