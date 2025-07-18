import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import ListaItems from '../components/ListaItems';
import ErrorHandler from '../components/ErrorHandler';
import bibliotecaApi from '../api/bibliotecaApi';

const DVDs = () => {
    const [dvds, setDVDs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [dvdActual, setDVDActual] = useState({
        titulo: '',
        director: '',
        duracion: 0,
        genero: '',
        disponible: true
    });

    const cargarDVDs = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await bibliotecaApi.getDVDs();
            setDVDs(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarDVDs();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (dvdActual.id) {
                await bibliotecaApi.actualizarDVD(dvdActual.id, dvdActual);
            } else {
                await bibliotecaApi.crearDVD(dvdActual);
            }
            await cargarDVDs();
            setShowModal(false);
        } catch (err) {
            setError(err.message);
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

            <ErrorHandler loading={loading} error={error} onRetry={cargarDVDs}>
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
                                await cargarDVDs();
                            } catch (err) {
                                setError(err.message);
                            }
                        }
                    }}
                />
            </ErrorHandler>

            {/* Modal para agregar/editar */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                {/* ... (igual que antes) ... */}
            </Modal>
        </div>
    );
};

export default DVDs;