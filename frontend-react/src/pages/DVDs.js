import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import ListaItems from '../components/ListaItems';
import bibliotecaApi from '../api/bibliotecaApi';

const DVDs = () => {
    const [dvds, setDVDs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [dvdActual, setDVDActual] = useState({
        titulo: '',
        director: '',
        duracion: 0,
        genero: '',
        disponible: true
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        cargarDVDs();
    }, []);

    const cargarDVDs = async () => {
        try {
            const response = await bibliotecaApi.getDVDs();
            setDVDs(response.data);
        } catch (error) {
            setError("Error cargando DVDs");
            console.error("Error:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (dvdActual.id) {
                await bibliotecaApi.actualizarDVD(dvdActual.id, dvdActual);
            } else {
                await bibliotecaApi.crearDVD(dvdActual);
            }
            cargarDVDs();
            setShowModal(false);
        } catch (error) {
            setError("Error guardando DVD");
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestión de DVDs</h2>
                <Button variant="primary" onClick={() => {
                    setDVDActual({
                        titulo: '',
                        director: '',
                        duracion: 0,
                        genero: '',
                        disponible: true
                    });
                    setShowModal(true);
                }}>
                    Agregar DVD
                </Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <ListaItems
                titulo="Listado de DVDs"
                columnas={[
                    { key: 'titulo', titulo: 'Título' },
                    { key: 'director', titulo: 'Director' },
                    { key: 'duracion', titulo: 'Duración (min)' },
                    { key: 'genero', titulo: 'Género' }
                ]}
                datos={dvds}
                onEditar={(dvd) => {
                    setDVDActual(dvd);
                    setShowModal(true);
                }}
                onEliminar={async (id) => {
                    if (window.confirm("¿Eliminar este DVD?")) {
                        try {
                            await bibliotecaApi.eliminarDVD(id);
                            cargarDVDs();
                        } catch (error) {
                            setError("Error eliminando DVD");
                        }
                    }
                }}
            />

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{dvdActual.id ? 'Editar' : 'Agregar'} DVD</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Título *</Form.Label>
                            <Form.Control
                                type="text"
                                value={dvdActual.titulo}
                                onChange={(e) => setDVDActual({...dvdActual, titulo: e.target.value})}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Director *</Form.Label>
                            <Form.Control
                                type="text"
                                value={dvdActual.director}
                                onChange={(e) => setDVDActual({...dvdActual, director: e.target.value})}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Duración (minutos) *</Form.Label>
                            <Form.Control
                                type="number"
                                value={dvdActual.duracion}
                                onChange={(e) => setDVDActual({...dvdActual, duracion: parseInt(e.target.value) || 0})}
                                required
                                min="1"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Género</Form.Label>
                            <Form.Control
                                type="text"
                                value={dvdActual.genero}
                                onChange={(e) => setDVDActual({...dvdActual, genero: e.target.value})}
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

export default DVDs;