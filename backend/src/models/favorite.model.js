
class Favorite {
    constructor({ id = null, user_id, book_id }) {
        this.id = id !== undefined ? id : null;
        this.user_id = Number.isInteger(user_id) ? user_id : parseInt(user_id, 10);
        this.book_id = Number.isInteger(book_id) ? book_id : parseInt(book_id, 10);

        this._validar();
    }

    static fromJSON(json) {
        return new Favorite({
            id: json.id ?? null,
            user_id: json.user_id,
            book_id: json.book_id
        });
    }

    toJSON() {
        return {
            id: this.id,
            user_id: this.user_id,
            book_id: this.book_id
        };
    }

    _validar() {
        const erros = [];

        if (!Number.isInteger(this.user_id) || isNaN(this.user_id)) {
            erros.push("user_id deve ser um número inteiro válido");
        }

        if (!Number.isInteger(this.book_id) || isNaN(this.book_id)) {
            erros.push("book_id deve ser um número inteiro válido");
        }

        if (erros.length > 0) {
            const error = new Error("Dados inválidos para Favorite");
            error.statusCode = 400;
            error.details = erros;
            throw error;
        }
    }
}

module.exports = Favorite;
