import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Card, Modal, Form } from 'react-bootstrap';

const Mesas = () => {
  const [mesas, setMesas] = useState([
    { id_mesa: 1, numero_mesa: '1', capacidad: 4, ubicacion: 'Esquina', estado: 'Disponible' },
    { id_mesa: 2, numero_mesa: '2', capacidad: 2, ubicacion: 'Centro', estado: 'Ocupada' },
    { id_mesa: 3, numero_mesa: '3', capacidad: 6, ubicacion: 'Ventana', estado: 'Disponible' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentMesa, setCurrentMesa] = useState(null);
  const [formData, setFormData] = useState({ numero_mesa: '', capacidad: '', ubicacion: '', estado: '' });

  useEffect(() => {
    const fetchMesas = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/mesas');
        setMesas(response.data);
      } catch (error) {
        console.error('Error al obtener las mesas:', error);
      }
    };

    // Llama a la función directamente
    fetchMesas();
  }, []);

  const handleAdd = async () => {
    console.log('Agregando mesa con datos:', formData); // Debugging
    try {
      const response = await axios.post('http://localhost:3001/api/mesas', formData);
      setMesas([...mesas, response.data]);
      handleCloseAddModal();
    } catch (error) {
      console.error('Error al agregar la mesa:', error);
    }
  };

  const handleEdit = async () => {
    console.log('Editando mesa con datos:', formData); // Debugging
    try {
      const response = await axios.put(`http://localhost:3001/api/mesas/${currentMesa.id_mesa}`, formData);
      setMesas(mesas.map(mesa => (mesa.id_mesa === currentMesa.id_mesa ? response.data : mesa)));
      handleCloseEditModal();
    } catch (error) {
      console.error('Error al editar la mesa:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta mesa?')) {
      try {
        await axios.delete(`http://localhost:3001/api/mesas/${id}`);
        setMesas(mesas.filter(mesa => mesa.id_mesa !== id));
      } catch (error) {
        console.error('Error al eliminar la mesa:', error);
      }
    }
  };

  const handleShowEditModal = (mesa) => {
    setCurrentMesa(mesa);
    setFormData({ numero_mesa: mesa.numero_mesa, capacidad: mesa.capacidad, ubicacion: mesa.ubicacion, estado: mesa.estado });
    setShowEditModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setFormData({ numero_mesa: '', capacidad: '', ubicacion: '', estado: '' });
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setCurrentMesa(null);
    setFormData({ numero_mesa: '', capacidad: '', ubicacion: '', estado: '' });
  };

  return (
    <Card className="p-4">
      <h2>Gestión de Mesas</h2>
      <div className="d-flex justify-content-between mb-3">
        <Button variant="success" onClick={() => setShowAddModal(true)}>
          Agregar Mesa
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID Mesa</th>
            <th>Número de Mesa</th>
            <th>Capacidad</th>
            <th>Ubicación</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mesas.map((mesa) => (
            <tr key={mesa.id_mesa}>
              <td>{mesa.id_mesa}</td>
              <td>{mesa.numero_mesa}</td>
              <td>{mesa.capacidad}</td>
              <td>{mesa.ubicacion}</td>
              <td>{mesa.estado}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowEditModal(mesa)}>
                  Editar
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(mesa.id_mesa)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para Agregar Mesa */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Mesa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="numero_mesa">
              <Form.Label>Número de Mesa</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el número de mesa" value={formData.numero_mesa} onChange={(e) => setFormData({ ...formData, numero_mesa: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="capacidad">
              <Form.Label>Capacidad</Form.Label>
              <Form.Control type="number" placeholder="Ingrese la capacidad" value={formData.capacidad} onChange={(e) => setFormData({ ...formData, capacidad: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="ubicacion">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control type="text" placeholder="Ingrese la ubicación" value={formData.ubicacion} onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="estado">
              <Form.Label>Estado</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el estado" value={formData.estado} onChange={(e) => setFormData({ ...formData, estado: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para Editar Mesa */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Mesa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="numero_mesa">
              <Form.Label>Número de Mesa</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el número de mesa" value={formData.numero_mesa} onChange={(e) => setFormData({ ...formData, numero_mesa: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="capacidad">
              <Form.Label>Capacidad</Form.Label>
              <Form.Control type="number" placeholder="Ingrese la capacidad" value={formData.capacidad} onChange={(e) => setFormData({ ...formData, capacidad: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="ubicacion">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control type="text" placeholder="Ingrese la ubicación" value={formData.ubicacion} onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="estado">
              <Form.Label>Estado</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el estado" value={formData.estado} onChange={(e) => setFormData({ ...formData, estado: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default Mesas;
