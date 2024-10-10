const express = require('express');
const router = express.Router();
const pedidoController = require('../components/pedidoController');

router.get('/', pedidoController.getPedidos);
router.post('/', pedidoController.createPedido);

module.exports = router;
