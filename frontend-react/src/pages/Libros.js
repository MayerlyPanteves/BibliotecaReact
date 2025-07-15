import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import ListaItems from '../components/ListaItems';
import bibliotecaApi from '../api/bibliotecaApi';

const Libros = () => {
    const [libros, setLibros] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [libroActual, setLibroActual] = useState({
        titulo: '',
        autor: '',
        isbn: '',
        añoPublicacion: '',
        // ...otros campos según tu modelo
    });

    useEffect(() => {
        cargarLibros();
    }, []);

    const cargarLibros = async () => {
        try {
            const response = await bibliotecaApi.getLibros();
            setLibros(response.data);
        } catch (error) {
            console.error("Error cargando libros:", error);
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
            console.error("Error guardando libro:", error);
        }
    };

    const eliminarLibro = async (id) => {
        if (window.confirm("¿Está seguro de eliminar este libro?")) {
            try {
                await bibliotecaApi.eliminarLibro(id);
                cargarLibros();
            } catch (error) {
                console.error("Error eliminando libro:", error);
            }
        }
    };

    return (
        <div>
            <Button variant="primary" onClick={() => {
                setLibroActual({
                    titulo: '',
                    autor: '',
                    // ...otros campos
                });
                setShowModal(true);
            }}>
                Agregar Libro
            </Button>

            <ListaItems
                titulo="Listado de Libros"
                columnas={[
                    { key: 'titulo', titulo: 'Título' },
                    { key: 'autor', titulo: 'Autor' },
                    { key: 'isbn', titulo: 'ISBN' },
                    // ...otras columnas
                ]}
                datos={libros}
                onEditar={(libro) => {
                    setLibroActual(libro);
                    setShowModal(true);
                }}
                onEliminar={eliminarLibro}
            />

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{libroActual.id ? 'Editar' : 'Agregar'} Libro</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                value={libroActual.titulo}
                                onChange={(e) => setLibroActual({...libroActual, titulo: e.target.value})}
                                required
                            />
                        </Form.Group>
                        {/* Repite para otros campos */}
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