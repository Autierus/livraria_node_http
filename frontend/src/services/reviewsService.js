import api from './api';

export const reviewsService = {
    // Lista todas as reviews do sistema
    async listar() {
        const response = await api.get('/reviews');
        return response.data;
    },

    // Lista reviews de um livro específico
    async listarPorLivro(livroId) {
        const response = await api.get(`/reviews/livro/${livroId}`);
        return response.data;
    },

    // Busca uma única review por ID
    async buscarPorId(id) {
        const response = await api.get(`/reviews/${id}`);
        return response.data;
    },

    // Cria uma nova review
    async criar(review) {
        const response = await api.post('/reviews', review);
        return response.data;
    },

    // Atualiza review existente
    async atualizar(id, review) {
        const response = await api.put(`/reviews/${id}`, review);
        return response.data;
    },

    // Remove review
    async remover(id) {
        const response = await api.delete(`/reviews/${id}`);
        return response.data;
    }
};
