const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Plato = sequelize.define('Plato', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = Plato;
