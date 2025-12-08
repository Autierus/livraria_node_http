import React, { useEffect, useState } from "react";
import LivroCard from "../components/LivroCard";
import { favoritesService } from "../services/favoritesService";
import { livrosService } from "../services/livrosService";
import './Livros.css';

const MeusFavoritos = () => {
    const [favoritos, setFavoritos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Carrega os favoritos do usuário logado
    const carregarFavoritos = async () => {
        try {
            setLoading(true);
            // 1. Busca IDs de livros favoritados
            const favIds = await favoritesService.listar(); // retorna [{id, book_id, user_id}]
            
            // 2. Busca dados completos dos livros
            const livrosCompletos = await Promise.all(
                favIds.map(async (f) => {
                    return await livrosService.buscarPorId(f.book_id);
                })
            );

            setFavoritos(livrosCompletos);
        } catch (error) {
            console.error("Erro ao carregar favoritos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarFavoritos();
    }, []);

    // Desfavoritar um livro
    const handleToggleFavorito = async (livro) => {
        try {
            await favoritesService.remover(livro.id);
            // Atualiza lista local
            setFavoritos((prev) => prev.filter((l) => l.id !== livro.id));
        } catch (error) {
            console.error("Erro ao atualizar favorito:", error);
        }
    };

    if (loading) return <p>Carregando seus favoritos...</p>;

    if (favoritos.length === 0) return <p>Você não possui livros favoritados.</p>;

    return (
        <div className="meus-favoritos-container">
            <div className="livros-header">
                <h1>Meus Favoritos</h1>
            </div>
            <div className="livros-grid">
                {favoritos.map((livro) => (
                    <LivroCard
                        key={livro.id}
                        livro={livro}
                        onEdit={() => {}}
                        onDelete={() => handleToggleFavorito(livro)} // desfavoritar
                        onAddReview={() => {}}
                    />
                ))}
            </div>
        </div>
    );
};

export default MeusFavoritos;
