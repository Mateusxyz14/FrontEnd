import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '../css/App.css'
import Login from '../components/Login.jsx'
import Almacen from '../components/almacen/Almacen.jsx'
import Cliente from '../components/cliente/Cliente';

function App() {
  // Creamos una función de notificación local para que no rompa el código
  const notificacion = (mensaje, tipo = "info", duracion = 3000) => {
    let container = document.querySelector('.notif-container');
    if (!container) return;
    const typeofNotif = document.createElement('div');
    typeofNotif.className = `notif-toast ${tipo}`;
    typeofNotif.innerText = mensaje;
    container.appendChild(typeofNotif);
    setTimeout(() => typeofNotif.remove(), duracion);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/almacen" element={<Almacen />} />
        
        {/* CORREGIDO: Cambiamos 'this.notificacion' por 'notificacion' */}
        <Route path="/cliente" element={<Cliente notificacion={notificacion} />} />
        <Route path="/clientes" element={<Cliente notificacion={notificacion} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App