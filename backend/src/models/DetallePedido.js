const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pedido = require('./Pedido');
const Plato = require('./Plato');

const DetallePedido = sequelize.define('DetallePedido', {
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

DetallePedido.belongsTo(Pedido);
DetallePedido.belongsTo(Plato);

module.exports = DetallePedido;
