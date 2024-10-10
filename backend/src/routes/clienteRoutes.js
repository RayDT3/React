const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

// Ruta para obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.findAll(); // Verifica que 'findAll()' esté configurado
    res.json(clientes);
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    res.status(500).json({ message: 'Error al obtener los clientes' });
  }
});

module.exports = router;
