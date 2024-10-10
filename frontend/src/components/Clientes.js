import axios from 'axios';
import { useEffect, useState } from 'react';

function Clientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    // Realizar la petición GET a tu backend para obtener los clientes
    axios.get('http://localhost:3000/clientes')
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.error('Hubo un error obteniendo los clientes:', error);
      });
  }, []);

  return (
    <div>
      <h1>Clientes</h1>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>{cliente.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

export default Clientes;
