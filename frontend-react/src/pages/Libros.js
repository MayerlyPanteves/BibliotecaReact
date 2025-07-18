import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import ListaItems from '../components/ListaItems';
import bibliotecaApi from '../api/bibliotecaApi';

const Libros = () => {
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // ...otros estados

    useEffect(() => {
        const cargarLibros = async () => {
            try {
                setLoading(true);
                const data = await bibliotecaApi.getLibros();
                setLibros(data);
                setError(null);
            } catch (err) {
                setError(err.message || "Error cargando libros");
            } finally {
                setLoading(false);
            }
        };

        cargarLibros();
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" className="mt-4">
                {error}
                <Button variant="link" onClick={() => window.location.reload()}>
                    Intentar nuevamente
                </Button>
            </Alert>
        );
    }

    return (
        <div className="mt-4">
            <h2>Gestión de Libros</h2>
            {/* Resto del componente */}
        </div>
    );
};

export default Libros;