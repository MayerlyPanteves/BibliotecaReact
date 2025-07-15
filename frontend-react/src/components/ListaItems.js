import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';

const ListaItems = ({ titulo, columnas, datos, onEditar, onEliminar, onPrestar }) => {
    return (
        <div className="mt-4">
            <h3>{titulo}</h3>
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    {columnas.map((col) => (
                        <th key={col.key}>{col.titulo}</th>
                    ))}
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {datos.map((item) => (
                    <tr key={item.id}>
                        {columnas.map((col) => (
                            <td key={`${item.id}-${col.key}`}>{item[col.key]}</td>
                        ))}
                        <td>
                            {item.disponible ? (
                                <Badge bg="success">Disponible</Badge>
                            ) : (
                                <Badge bg="danger">Prestado</Badge>
                            )}
                        </td>
                        <td>
                            <Button variant="warning" size="sm" onClick={() => onEditar(item)} className="me-2">
                                Editar
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => onEliminar(item.id)} className="me-2">
                                Eliminar
                            </Button>
                            {item.disponible && (
                                <Button variant="primary" size="sm" onClick={() => onPrestar(item.id)}>
                                    Prestar
                                </Button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ListaItems;