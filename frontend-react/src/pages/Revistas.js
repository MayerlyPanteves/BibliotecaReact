import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import ListaItems from '../components/ListaItems';
import bibliotecaApi from '../api/bibliotecaApi';

const Revistas = () => {
    const [revistas, setRevistas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [revistaActual, setRevistaActual] = useState({
        titulo: '',
        editorial: '',
        numero: '',
        fechaPublicacion: '',
        disponible: true
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        cargarRevistas();
    }, []);

    const cargarRevistas = async () => {
        try {
            const response = await bibliotecaApi.getRevistas();
            setRevistas(response.data);
        } catch (error) {
            setError("Error cargando revistas");
            console.error("Error:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (revistaActual.id) {
                await bibliotecaApi.actualizarRevista(revistaActual.id, revistaActual);
            } else {
                await bibliotecaApi.crearRevista(revistaActual);
            }
            cargarRevistas();
            setShowModal(false);
        } catch (error) {
            setError("Error guardando revista");
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestión de Revistas</h2>
                <Button variant="primary" onClick={() => {
                    setRevistaActual({
                        titulo: '',
                        editorial: '',
                        numero: '',
                        fechaPublicacion: '',
                        disponible: true
                    });
                    setShowModal(true);
                }}>
                    Agregar Revista
                </Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <ListaItems
                titulo="Listado de Revistas"
                columnas={[
                    { key: 'titulo', titulo: 'Título' },
                    { key: 'editorial', titulo: 'Editorial' },
                    { key: 'numero', titulo: 'Número' },
                    { key: 'fechaPublicacion', titulo: 'Fecha Publicación' }
                ]}
                datos={revistas}
                onEditar={(revista) => {
                    setRevistaActual(revista);
                    setShowModal(true);
                }}
                onEliminar={async (id) => {
                    if (window.confirm("¿Eliminar esta revista?")) {
                        try {
                            await bibliotecaApi.eliminarRevista(id);
                            cargarRevistas();
                        } catch (error) {
                            setError("Error eliminando revista");
                        }
                    }
                }}
            />

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{revistaActual.id ? 'Editar' : 'Agregar'} Revista</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Título *</Form.Label>
                            <Form.Control
                                type="text"
                                value={revistaActual.titulo}
                                onChange={(e) => setRevistaActual({...revistaActual, titulo: e.target.value})}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Editorial *</Form.Label>
                            <Form.Control
                                type="text"
                                value={revistaActual.editorial}
                                onChange={(e) => setRevistaActual({...revistaActual, editorial: e.target.value})}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Número *</Form.Label>
                            <Form.Control
                                type="text"
                                value={revistaActual.numero}
                                onChange={(e) => setRevistaActual({...revistaActual, numero: e.target.value})}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Fecha de Publicación</Form.Label>
                            <Form.Control
                                type="date"
                                value={revistaActual.fechaPublicacion}
                                onChange={(e) => setRevistaActual({...revistaActual, fechaPublicacion: e.target.value})}
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

export default Revistas;