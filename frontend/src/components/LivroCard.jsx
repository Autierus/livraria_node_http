import React, { useEffect, useState } from 'react';
import './LivroCard.css';
import { favoritesService } from '../services/favoritesService';

const LivroCard = ({ livro, onEdit, onDelete, onAddReview }) => {
    const [isFavorito, setIsFavorito] = useState(false);
    const [loading, setLoading] = useState(true);

    // Calcula média de forma segura
    const notasValidas = livro.reviews
        ? livro.reviews
              .map(r => r.nota ?? r.rating)
              .filter(n => typeof n === "number" && !isNaN(n))
        : [];

    const media =
        notasValidas.length > 0
            ? (notasValidas.reduce((acc, n) => acc + n, 0) / notasValidas.length).toFixed(1)
            : null;

    // Verifica se o livro já está favoritado ao montar o componente
    useEffect(() => {
        let isMounted = true;
        const checkFavorito = async () => {
            try {
                const resultado = await favoritesService.verificar(livro.id);
                if (isMounted) setIsFavorito(resultado);
            } catch (error) {
                console.error('Erro ao verificar favorito:', error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        checkFavorito();
        return () => { isMounted = false; };
    }, [livro.id]);

    // Função para alternar favorito
    const toggleFavorito = async () => {
        try {
            setLoading(true);
            if (isFavorito) {
                await favoritesService.remover(livro.id);
                setIsFavorito(false);
            } else {
                await favoritesService.adicionar(livro.id);
                setIsFavorito(true);
            }
        } catch (error) {
            console.error('Erro ao atualizar favorito:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="livro-card">
            <h3>{livro.titulo}</h3>

            <p className="autor">
                <strong>Autor:</strong> {livro.autor}
            </p>

            <p className="ano">
                <strong>Ano:</strong> {livro.ano}
            </p>

            {livro.editora && (
                <p className="editora">
                    <strong>Editora:</strong> {livro.editora}
                </p>
            )}

            {/* Média de Reviews – aparece somente se for válida */}
            {media !== null && (
                <p className="media-review">
                    ⭐ <strong>Média:</strong> {media}/5 ({livro.reviews.length} reviews)
                </p>
            )}

            {/* Lista de reviews */}
            {livro.reviews && livro.reviews.length > 0 && (
                <div className="reviews-list">
                    <h4>Reviews:</h4>
                    <ul>
                        {livro.reviews.map((r) => (
                            <li key={r.id}>
                                <strong>{r.nota ?? r.rating}⭐</strong> — {r.comentario}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Botões */}
            <div className="card-actions">
                <button
                    onClick={onAddReview}
                    className="btn btn-secondary"
                >
                    ➕ Adicionar Review
                </button>

                <button
                    onClick={() => onEdit(livro)}
                    className="btn btn-primary"
                >
                    ✏️ Editar
                </button>

                <button
                    onClick={() => onDelete(livro.id)}
                    className="btn btn-danger"
                >
                    🗑️ Remover
                </button>

                <button
                    onClick={toggleFavorito}
                    className={`btn ${isFavorito ? 'btn-warning' : 'btn-outline-warning'}`}
                    disabled={loading}
                >
                    {isFavorito ? '⭐ Favorito' : '☆ Favoritar'}
                </button>
            </div>
        </div>
    );
};

export default LivroCard;
