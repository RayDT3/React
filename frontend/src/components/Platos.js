import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Card, Modal, Form } from 'react-bootstrap';

const Plato = () => {
  const [platos, setPlatos] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPlato, setCurrentPlato] = useState(null);
  const [formData, setFormData] = useState({ id_plato: '', nombre: '', precio: '', estado: '' });

  useEffect(() => {
    const fetchPlatos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/platos');
        setPlatos(response.data);
      } catch (error) {
        console.error('Error al obtener los platos:', error);
      }
    };

    fetchPlatos(); // Solo se llama a fetchPlatos una vez al cargar el componente
  }, []); // El array de dependencias está vacío para que solo se ejecute al montarse

  // Función para agregar platos de ejemplo solo si la lista está vacía
  const initializePlatos = () => {
    const initialPlatos = [
      { id_plato: '1', nombre: 'Ceviche Clásico', precio: '30.00', estado: 'Disponible' },
      { id_plato: '2', nombre: 'Taco de Pescado', precio: '25.00', estado: 'Disponible' },
      { id_plato: '3', nombre: 'Arroz con Mariscos', precio: '40.00', estado: 'No Disponible' },
    ];

    // Verificar si la lista de platos está vacía antes de agregar datos de ejemplo
    if (platos.length === 0) {
      setPlatos(initialPlatos);
    }
  };

  useEffect(() => {
    initializePlatos(); // Inicializa los platos de ejemplo después de que el componente se monta
  }, [platos.length]); // Se ejecuta cuando cambia el tamaño de la lista de platos

  const handleAdd = async () => {
    console.log('Agregando plato con datos:', formData);
    try {
      const response = await axios.post('http://localhost:3001/api/platos', formData);
      setPlatos([...platos, response.data]);
      handleCloseAddModal();
    } catch (error) {
      console.error('Error al agregar el plato:', error);
    }
  };

  const handleEdit = async () => {
    console.log('Editando plato con datos:', formData);
    try {
      const response = await axios.put(`http://localhost:3001/api/platos/${currentPlato.id_plato}`, formData);
      setPlatos(platos.map(plato => (plato.id_plato === currentPlato.id_plato ? response.data : plato)));
      handleCloseEditModal();
    } catch (error) {
      console.error('Error al editar el plato:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este plato?')) {
      try {
        await axios.delete(`http://localhost:3001/api/platos/${id}`);
        setPlatos(platos.filter(plato => plato.id_plato !== id));
      } catch (error) {
        console.error('Error al eliminar el plato:', error);
      }
    }
  };

  const handleShowEditModal = (plato) => {
    setCurrentPlato(plato);
    setFormData({ id_plato: plato.id_plato, nombre: plato.nombre, precio: plato.precio, estado: plato.estado });
    setShowEditModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setFormData({ id_plato: '', nombre: '', precio: '', estado: '' });
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setCurrentPlato(null);
    setFormData({ id_plato: '', nombre: '', precio: '', estado: '' });
  };

  return (
    <Card className="p-4">
      <h2>Gestión de Platos</h2>
      <div className="d-flex justify-content-between mb-3">
        <Button variant="success" onClick={() => setShowAddModal(true)}>
          Agregar Plato
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID Plato</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {platos.map((plato) => (
            <tr key={plato.id_plato}>
              <td>{plato.id_plato}</td>
              <td>{plato.nombre}</td>
              <td>{plato.precio}</td>
              <td>{plato.estado}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowEditModal(plato)}>
                  Editar
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(plato.id_plato)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para Agregar Plato */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Plato</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el nombre del plato" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="precio">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el precio" value={formData.precio} onChange={(e) => setFormData({ ...formData, precio: e.target.value })} />
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

      {/* Modal para Editar Plato */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Plato</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el nombre del plato" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="precio">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el precio" value={formData.precio} onChange={(e) => setFormData({ ...formData, precio: e.target.value })} />
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

export default Plato;
