const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const clienteRoutes = require('./routes/clienteRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/clientes', clienteRoutes);
app.use('/pedidos', pedidoRoutes);

// Sincronizar la base de datos
sequelize.sync().then(() => {
  console.log('Base de datos conectada');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
