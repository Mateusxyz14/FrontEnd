import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '../css/App.css'
import Login from '../components/Login.jsx'
import Almacen from '../components/almacen/Almacen.jsx'

function App() {
  return (
    <BrowserRouter>
     <Routes>
       <Route path="/" element={<Login />} />
       <Route path="/almacen" element={<Almacen />} />
     </Routes>
    </BrowserRouter>
  )
}

export default App
