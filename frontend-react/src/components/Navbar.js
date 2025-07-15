import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Biblioteca</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/libros">Libros</Nav.Link>
                    <Nav.Link as={Link} to="/dvds">DVDs</Nav.Link>
                    <Nav.Link as={Link} to="/revistas">Revistas</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;