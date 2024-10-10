const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./Cliente');
const Mesa = require('./Mesa');

const Pedido = sequelize.define('Pedido', {
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
});

Pedido.belongsTo(Cliente);
Pedido.belongsTo(Mesa);

module.exports = Pedido;
