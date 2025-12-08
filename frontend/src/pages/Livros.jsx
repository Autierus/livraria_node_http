import React, { useState, useEffect } from 'react';
import { livrosService } from '../services/livrosService';
import { reviewsService } from '../services/reviewsService';
import LivroCard from '../components/LivroCard';
import LivroForm from '../components/LivroForm';
import './Livros.css';

const Livros = () => {
    const [livros, setLivros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingLivro, setEditingLivro] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        carregarLivros();
    }, []);

    const carregarLivros = async () => {
        try {
            setLoading(true);
            setError('');
            
            const data = await livrosService.listar();

            // Carrega reviews de cada livro
            const livrosComReviews = await Promise.all(
                data.map(async (livro) => {
                    const reviews = await reviewsService.listarPorLivro(livro.id);
                    return { ...livro, reviews };
                })
            );

            setLivros(livrosComReviews);
        } catch (err) {
            setError('Erro ao carregar livros. Tente novamente.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingLivro(null);
        setShowForm(true);
    };

    const handleEdit = (livro) => {
        setEditingLivro(livro);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja remover este livro?')) {
            return;
        }

        try {
            await livrosService.remover(id);
            showSuccess('Livro removido com sucesso!');
            carregarLivros();
        } catch (err) {
            setError('Erro ao remover livro. Tente novamente.');
            console.error(err);
        }
    };

    const handleAddReview = (livroId) => {
        const texto = prompt("Digite sua review:");
        if (!texto) return;

        const nota = parseInt(prompt("Nota de 1 a 5:"), 10);
        if (isNaN(nota) || nota < 1 || nota > 5) {
            alert("Nota inválida.");
            return;
        }

        reviewsService
            .criar({
                livro_id: livroId,
                user_id: 1, // depois ligar ao usuário logado
                nota,
                comentario: texto
            })
            .then(() => {
                showSuccess("Review adicionada com sucesso!");
                carregarLivros();
            })
            .catch(() => setError("Erro ao adicionar review"));
    };

    const handleSubmit = async (formData) => {
        try {
            if (editingLivro) {
                await livrosService.atualizar(editingLivro.id, formData);
                showSuccess('Livro atualizado com sucesso!');
            } else {
                await livrosService.criar(formData);
                showSuccess('Livro criado com sucesso!');
            }
            setShowForm(false);
            setEditingLivro(null);
            carregarLivros();
        } catch (err) {
            setError(err.response?.data?.erro || 'Erro ao salvar livro. Tente novamente.');
            console.error(err);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingLivro(null);
    };

    const showSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    if (loading) {
        return (
            <div className="container">
                <div className="loading">Carregando livros...</div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="livros-header">
                <h1>Meus Livros</h1>
                <button onClick={handleCreate} className="btn btn-primary">
                    ➕ Adicionar Livro
                </button>
            </div>

            {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
            )}

            {error && (
                <div className="alert alert-error">{error}</div>
            )}

            {livros.length === 0 ? (
                <div className="empty-state">
                    <p>Nenhum livro cadastrado ainda.</p>
                    <button onClick={handleCreate} className="btn btn-primary">
                        Adicionar seu primeiro livro
                    </button>
                </div>
            ) : (
                <div className="livros-grid">
                    {livros.map((livro) => (
                        <LivroCard
                            key={livro.id}
                            livro={livro}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onAddReview={() => handleAddReview(livro.id)}
                        />
                    ))}
                </div>
            )}

            {showForm && (
                <LivroForm
                    livro={editingLivro}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default Livros;
