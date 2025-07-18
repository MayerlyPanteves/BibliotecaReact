import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Inicio() {
    const navigate = useNavigate();

    return (
        <Container className="text-center mt-5">
            <h1 className="mb-4">Sistema de Biblioteca</h1>
            <div className="d-grid gap-3" style={{ maxWidth: '300px', margin: '0 auto' }}>
                <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate('/libros')}
                >
                    Libros
                </Button>
                <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate('/dvds')}
                >
                    DVDs
                </Button>
                <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate('/revistas')}
                >
                    Revistas
                </Button>
            </div>
        </Container>
    );
}

export default Inicio;