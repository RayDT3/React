const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Mesa = sequelize.define('Mesa', {
  numero: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  capacidad: {
    type: DataTypes.INTEGER
  }
});

module.exports = Mesa;
