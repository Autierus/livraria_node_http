class Review {
    constructor({ 
        id = null, 
        livro_id, 
        user_id, 
        rating, 
        comentario = '', 
        created_at = null
    }) {
        this.id = id !== undefined ? id : null;

        // id do livro
        this.livro_id = Number.isInteger(livro_id) ? livro_id : parseInt(livro_id, 10);

        // id do usuário (agora sempre vem da autenticação, não do body)
        if (user_id !== undefined && user_id !== null) {
            this.user_id = Number.isInteger(user_id) ? user_id : parseInt(user_id, 10);
        } else {
            this.user_id = null;
        }

        // rating
        this.rating = Number.isInteger(rating) ? rating : parseInt(rating, 10);

        // comentário opcional
        this.comentario = comentario ? String(comentario).trim() : '';

        // created_at vem do banco; se não vier, gera um novo
        this.created_at = created_at || new Date().toISOString();

        this._validar();
    }

    static fromJSON(json) {
        return new Review({
            id: json.id ?? null,
            livro_id: json.livro_id,
            user_id: json.user_id,
            rating: json.rating,
            comentario: json.comentario,
            created_at: json.created_at ?? null
        });
    }

    toJSON() {
        return {
            id: this.id,
            livro_id: this.livro_id,
            user_id: this.user_id,
            rating: this.rating,
            comentario: this.comentario,
            created_at: this.created_at
        };
    }

    _validar() {
        const erros = [];

        if (!this.livro_id || isNaN(this.livro_id)) {
            erros.push("livro_id é obrigatório e deve ser um número");
        }

        if (!this.user_id || isNaN(this.user_id)) {
            erros.push("user_id é obrigatório e deve ser um número");
        }

        if (!this.rating || isNaN(this.rating)) {
            erros.push("rating é obrigatório e deve ser um número");
        } else if (this.rating < 1 || this.rating > 5) {
            erros.push("rating deve ser um valor entre 1 e 5");
        }

        if (this.comentario && this.comentario.length > 500) {
            erros.push("comentario deve ter no máximo 500 caracteres");
        }

        if (erros.length > 0) {
            const error = new Error("Dados inválidos");
            error.statusCode = 400;
            error.details = erros;
            throw error;
        }
    }
}

module.exports = Review;
