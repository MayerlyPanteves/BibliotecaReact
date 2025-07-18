import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import ListaItems from '../components/ListaItems';
import ErrorHandler from '../components/ErrorHandler';
import bibliotecaApi from '../api/bibliotecaApi';

const LibrosPage = () => {
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [libroActual, setLibroActual] = useState({
        titulo: '',
        autor: '',
        isbn: '',
        numeroPaginas: 0
    });

    const cargarLibros = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await bibliotecaApi.getLibros();
            setLibros(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarLibros();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (libroActual.id) {
                await bibliotecaApi.actualizarLibro(libroActual.id, libroActual);
            } else {
                await bibliotecaApi.crearLibro(libroActual);
            }
            await cargarLibros();
            setShowModal(false);
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestión de Libros</h2>
                <Button variant="primary" onClick={() => {
                    setLibroActual({
                        titulo: '',
                        autor: '',
                        isbn: '',
                        numeroPaginas: 0
                    });
                    setShowModal(true);
                }}>
                    Agregar Libro
                </Button>
            </div>

            <ErrorHandler loading={loading} error={error} onRetry={cargarLibros}>
                <ListaItems
                    columnas={[
                        { key: 'titulo', titulo: 'Título' },
                        { key: 'autor', titulo: 'Autor' },
                        { key: 'isbn', titulo: 'ISBN' },
                        { key: 'numeroPaginas', titulo: 'Páginas' }
                    ]}
                    datos={libros}
                    onEditar={(libro) => {
                        setLibroActual(libro);
                        setShowModal(true);
                    }}
                    onEliminar={async (id) => {
                        if (window.confirm('¿Está seguro de eliminar este libro?')) {
                            try {
                                await bibliotecaApi.eliminarLibro(id);
                                await cargarLibros();
                            } catch (err) {
                                setError(err);
                            }
                        }
                    }}
                />
            </ErrorHandler>

            {/* Modal para el formulario */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{libroActual.id ? 'Editar' : 'Agregar'} Libro</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        {/* Campos del formulario */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default LibrosPage;