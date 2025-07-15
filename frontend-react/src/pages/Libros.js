import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import ListaItems from '../components/ListaItems';
import bibliotecaApi from '../api/bibliotecaApi';

const Libros = () => {
    const [libros, setLibros] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [libroActual, setLibroActual] = useState({
        titulo: '',
        autor: '',
        isbn: '',
        numeroPaginas: 0,
        fechaPublicacion: '',
        disponible: true
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        cargarLibros();
    }, []);

    const cargarLibros = async () => {
        try {
            const response = await bibliotecaApi.getLibros();
            setLibros(response.data);
        } catch (error) {
            setError("Error cargando libros");
            console.error("Error:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (libroActual.id) {
                await bibliotecaApi.actualizarLibro(libroActual.id, libroActual);
            } else {
                await bibliotecaApi.crearLibro(libroActual);
            }
            cargarLibros();
            setShowModal(false);
        } catch (error) {
            setError("Error guardando libro");
            console.error("Error:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Está seguro de eliminar este libro?")) {
            try {
                await bibliotecaApi.eliminarLibro(id);
                cargarLibros();
            } catch (error) {
                setError("Error eliminando libro");
                console.error("Error:", error);
            }
        }
    };

    const handlePrestar = async (id) => {
        try {
            // Implementar lógica de préstamo
            await bibliotecaApi.prestarLibro(id);
            cargarLibros();
        } catch (error) {
            setError("Error al prestar libro");
            console.error("Error:", error);
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
                        numeroPaginas: 0,
                        fechaPublicacion: '',
                        disponible: true
                    });
                    setShowModal(true);
                }}>
                    Agregar Libro
                </Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <ListaItems
                titulo="Listado de Libros"
                columnas={[
                    { key: 'titulo', titulo: 'Título' },
                    { key: 'autor', titulo: 'Autor' },
                    { key: 'isbn', titulo: 'ISBN' },
                    { key: 'numeroPaginas', titulo: 'Páginas' },
                    { key: 'fechaPublicacion', titulo: 'Publicación' }
                ]}
                datos={libros}
                onEditar={(libro) => {
                    setLibroActual(libro);
                    setShowModal(true);
                }}
                onEliminar={handleDelete}
                onPrestar={handlePrestar}
            />

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{libroActual.id ? 'Editar' : 'Agregar'} Libro</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Título *</Form.Label>
                            <Form.Control
                                type="text"
                                value={libroActual.titulo}
                                onChange={(e) => setLibroActual({...libroActual, titulo: e.target.value})}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Autor *</Form.Label>
                            <Form.Control
                                type="text"
                                value={libroActual.autor}
                                onChange={(e) => setLibroActual({...libroActual, autor: e.target.value})}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>ISBN *</Form.Label>
                            <Form.Control
                                type="text"
                                value={libroActual.isbn}
                                onChange={(e) => setLibroActual({...libroActual, isbn: e.target.value})}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Número de Páginas</Form.Label>
                            <Form.Control
                                type="number"
                                value={libroActual.numeroPaginas}
                                onChange={(e) => setLibroActual({...libroActual, numeroPaginas: parseInt(e.target.value) || 0})}
                                min="1"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Fecha de Publicación</Form.Label>
                            <Form.Control
                                type="date"
                                value={libroActual.fechaPublicacion}
                                onChange={(e) => setLibroActual({...libroActual, fechaPublicacion: e.target.value})}
                            />
                        </Form.Group>
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

export default Libros;