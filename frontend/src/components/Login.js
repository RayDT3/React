import React, { useState } from 'react';
import axios from 'axios';

function Login({ history }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/login', { usuario, password });
      localStorage.setItem('token', res.data.token);
      history.push('/home');
    } catch (error) {
      alert('Usuario o contraseña incorrecta');
    }
  };

  return (
    <div style={{ backgroundImage: `url(/path/to/your/background.jpg)`, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '5px' }}>
        <h2>Ingresa tu Usuario</h2>
        <div>
          <label>Usuario:</label>
          <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;
