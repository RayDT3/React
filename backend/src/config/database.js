const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cevicheria', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

testConnection();

module.exports = sequelize;
