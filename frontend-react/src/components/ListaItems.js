import React, { useState, useEffect } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';

const ListaItems = ({ titulo, columnas, datos, onEditar, onEliminar }) => {
    return (
        <div className="mt-4">
            <h2>{titulo}</h2>
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    {columnas.map((col) => (
                        <th key={col.key}>{col.titulo}</th>
                    ))}
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
                            <Button variant="warning" size="sm" onClick={() => onEditar(item)} className="me-2">
                                Editar
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => onEliminar(item.id)}>
                                Eliminar
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ListaItems;