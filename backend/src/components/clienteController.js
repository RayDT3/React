const Cliente = require('../models/Cliente');

exports.getClientes = async (req, res) => {
  const clientes = await Cliente.findAll();
  res.json(clientes);
};

exports.createCliente = async (req, res) => {
  const cliente = await Cliente.create(req.body);
  res.json(cliente);
};
