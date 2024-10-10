import React, { useState } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Clientes from './Clientes';
import Mesas from './Mesas';
import Pedidos from './Pedidos';
import Platos from './Platos';

// Componentes de cada sección
const Inicio = () => (
  <Card className="mb-4">
    <Card.Body>
      <h5>Bienvenido a Cevichería La Red</h5>
      <p>Selecciona una opción del menú lateral para comenzar.</p>
    </Card.Body>
  </Card>
);

const Home = () => {
  const [activeComponent, setActiveComponent] = useState('Inicio'); // Estado para cambiar la sección

  // Mapeo de componentes según el botón seleccionado
  const renderComponent = () => {
    switch (activeComponent) {
      case 'Inicio':
        return <Inicio />;
      case 'Clientes':
        return <Clientes />; // Renderiza el componente Clientes
      case 'Mesas':
        return <Mesas />;
      case 'Pedidos':
        return <Pedidos />;
      case 'Platos':
        return <Platos />;
      default:
        return <Inicio />;
    }
  };

  return (
    <div className="d-flex">
      <div className="bg-primary text-white p-3" style={{ width: '250px', height: '100vh' }}>
        <h4 className="mb-4 text-center">Cevichería La Red</h4>
        <ListGroup variant="flush">
          <ListGroup.Item action className="bg-primary text-white" onClick={() => setActiveComponent('Inicio')}>Inicio</ListGroup.Item>
          <ListGroup.Item action className="bg-primary text-white" onClick={() => setActiveComponent('Clientes')}>Clientes</ListGroup.Item>
          <ListGroup.Item action className="bg-primary text-white" onClick={() => setActiveComponent('Mesas')}>Mesas</ListGroup.Item>
          <ListGroup.Item action className="bg-primary text-white" onClick={() => setActiveComponent('Pedidos')}>Pedidos</ListGroup.Item>
          <ListGroup.Item action className="bg-primary text-white" onClick={() => setActiveComponent('Platos')}>Platos</ListGroup.Item>
        </ListGroup>
      </div>

      <Container fluid className="p-4">
        <Row>
          <Col md={12}>
            {renderComponent()} {/* Aquí se renderiza el componente correspondiente */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
