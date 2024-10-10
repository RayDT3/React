const Pedido = require('../models/Pedido');
const Cliente = require('../models/Cliente');
const Mesa = require('../models/Mesa');

exports.getPedidos = async (req, res) => {
  const pedidos = await Pedido.findAll({ include: [Cliente, Mesa] });
  res.json(pedidos);
};

exports.createPedido = async (req, res) => {
  const pedido = await Pedido.create(req.body);
  res.json(pedido);
};
