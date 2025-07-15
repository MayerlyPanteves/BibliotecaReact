import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LibroForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [libro, setLibro] = useState({
        titulo: '',
        autor: '',
        isbn: '',
        // otros campos según tu modelo
    });

    useEffect(() => {
        if (id) {
            fetchLibro();
        }
    }, [id]);

    const fetchLibro = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/libros/${id}`);
            setLibro(response.data);
        } catch (error) {
            console.error("Error fetching libro:", error);
        }
    };

    const handleChange = (e) => {
        setLibro({
            ...libro,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`http://localhost:8080/api/libros/${id}`, libro);
            } else {
                await axios.post('http://localhost:8080/api/libros', libro);
            }
            navigate('/libros');
        } catch (error) {
            console.error("Error saving libro:", error);
        }
    };

    return (
        <div>
            <h2>{id ? 'Editar Libro' : 'Agregar Nuevo Libro'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Título</label>
                    <input
                        type="text"
                        className="form-control"
                        name="titulo"
                        value={libro.titulo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Autor</label>
                    <input
                        type="text"
                        className="form-control"
                        name="autor"
                        value={libro.autor}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">ISBN</label>
                    <input
                        type="text"
                        className="form-control"
                        name="isbn"
                        value={libro.isbn}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Agrega más campos según tu modelo */}
                <button type="submit" className="btn btn-primary me-2">
                    {id ? 'Actualizar' : 'Guardar'}
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate('/libros')}
                >
                    Cancelar
                </button>
            </form>
        </div>
    );
};

export default LibroForm;