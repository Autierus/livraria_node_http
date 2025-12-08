const validarParamId = (req, res, next) => {
    // tenta ler id ou bookId
    const id = parseInt(req.params.id ?? req.params.bookId);

    if (isNaN(id)) {
        return res.status(400).json({ erro: "ID deve ser um número válido" });
    }

    next();
};

module.exports = { validarParamId };
