import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Card, Modal, Form } from 'react-bootstrap';

const Pedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPedido, setCurrentPedido] = useState(null);
  const [formData, setFormData] = useState({ id_pedido: '', id_cliente: '', id_mesa: '', id_plato: '', cantidad: '' });

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/pedidos');
        setPedidos(response.data);
      } catch (error) {
        console.error('Error al obtener los pedidos:', error);
      }
    };

    fetchPedidos();
  }, []); // Solo se ejecuta al montar el componente

  // Función para agregar pedidos de ejemplo solo si la lista está vacía
  const initializePedidos = () => {
    const initialPedidos = [
      { id_pedido: '1', id_cliente: '1', id_mesa: '1', id_plato: '1', cantidad: '2' },
      { id_pedido: '2', id_cliente: '2', id_mesa: '2', id_plato: '2', cantidad: '1' },
    ];

    if (pedidos.length === 0) {
      setPedidos(initialPedidos);
    }
  };

  useEffect(() => {
    initializePedidos(); // Inicializa los pedidos de ejemplo
  }, [pedidos.length]); // Se ejecuta cuando cambia el tamaño de la lista de pedidos

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/pedidos', formData);
      setPedidos([...pedidos, response.data]);
      handleCloseAddModal();
    } catch (error) {
      console.error('Error al agregar el pedido:', error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/api/pedidos/${currentPedido.id_pedido}`, formData);
      setPedidos(pedidos.map(pedido => (pedido.id_pedido === currentPedido.id_pedido ? response.data : pedido)));
      handleCloseEditModal();
    } catch (error) {
      console.error('Error al editar el pedido:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
      try {
        await axios.delete(`http://localhost:3001/api/pedidos/${id}`);
        setPedidos(pedidos.filter(pedido => pedido.id_pedido !== id));
      } catch (error) {
        console.error('Error al eliminar el pedido:', error);
      }
    }
  };

  const handleShowEditModal = (pedido) => {
    setCurrentPedido(pedido);
    setFormData({ id_pedido: pedido.id_pedido, id_cliente: pedido.id_cliente, id_mesa: pedido.id_mesa, id_plato: pedido.id_plato, cantidad: pedido.cantidad });
    setShowEditModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setFormData({ id_pedido: '', id_cliente: '', id_mesa: '', id_plato: '', cantidad: '' });
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setCurrentPedido(null);
    setFormData({ id_pedido: '', id_cliente: '', id_mesa: '', id_plato: '', cantidad: '' });
  };

  return (
    <Card className="p-4">
      <h2>Gestión de Pedidos</h2>
      <div className="d-flex justify-content-between mb-3">
        <Button variant="success" onClick={() => setShowAddModal(true)}>
          Agregar Pedido
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID Pedido</th>
            <th>ID Cliente</th>
            <th>ID Mesa</th>
            <th>ID Plato</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id_pedido}>
              <td>{pedido.id_pedido}</td>
              <td>{pedido.id_cliente}</td>
              <td>{pedido.id_mesa}</td>
              <td>{pedido.id_plato}</td>
              <td>{pedido.cantidad}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowEditModal(pedido)}>
                  Editar
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(pedido.id_pedido)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para Agregar Pedido */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="id_cliente">
              <Form.Label>ID Cliente</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el ID del cliente" value={formData.id_cliente} onChange={(e) => setFormData({ ...formData, id_cliente: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="id_mesa">
              <Form.Label>ID Mesa</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el ID de la mesa" value={formData.id_mesa} onChange={(e) => setFormData({ ...formData, id_mesa: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="id_plato">
              <Form.Label>ID Plato</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el ID del plato" value={formData.id_plato} onChange={(e) => setFormData({ ...formData, id_plato: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="cantidad">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control type="text" placeholder="Ingrese la cantidad" value={formData.cantidad} onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })} />
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

      {/* Modal para Editar Pedido */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="id_cliente">
              <Form.Label>ID Cliente</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el ID del cliente" value={formData.id_cliente} onChange={(e) => setFormData({ ...formData, id_cliente: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="id_mesa">
              <Form.Label>ID Mesa</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el ID de la mesa" value={formData.id_mesa} onChange={(e) => setFormData({ ...formData, id_mesa: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="id_plato">
              <Form.Label>ID Plato</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el ID del plato" value={formData.id_plato} onChange={(e) => setFormData({ ...formData, id_plato: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="cantidad">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control type="text" placeholder="Ingrese la cantidad" value={formData.cantidad} onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })} />
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

export default Pedido;
