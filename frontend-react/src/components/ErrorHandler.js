import React from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';

const ErrorHandler = ({ loading, error, onRetry, children }) => {
    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
                <p>Cargando datos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" className="my-4">
                <Alert.Heading>Error</Alert.Heading>
                <p>{error.message || 'Ocurrió un error al cargar los datos'}</p>
                {onRetry && (
                    <Button variant="outline-danger" onClick={onRetry}>
                        Reintentar
                    </Button>
                )}
            </Alert>
        );
    }

    return children;
};

export default ErrorHandler;