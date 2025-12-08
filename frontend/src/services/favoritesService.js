import api from './api';

export const favoritesService = {
    // Lista todos os favoritos do usuário logado
    async listar() {
        const response = await api.get('/favorites');
        return response.data;
    },

    // Adiciona um livro aos favoritos
    async adicionar(bookId) {
        const response = await api.post(`/favorites/${bookId}`);
        return response.data;
    },

    // Remove um livro dos favoritos
    async remover(bookId) {
        const response = await api.delete(`/favorites/${bookId}`);
        return response.data;
    },

    // Verifica se um livro é favorito
    async verificar(bookId) {
        const response = await api.get(`/favorites/check/${bookId}`);
        return response.data.favorito; // true ou false
    }
};
