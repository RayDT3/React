import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Clientes from './components/Clientes'; // Usaremos el nuevo componente
import Platos from './components/Platos';
import Mesas from './components/Mesas';
import Pedidos from './components/Pedidos';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/platos" element={<Platos />} />
        <Route path="/mesas" element={<Mesas />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
