import React, { useState } from 'react'
//import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './css/App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


import Login from './components/Login.jsx'

import Empresa from './components/empresa/Empresa.jsx'




class App extends React.Component {
  notifiacion = (mensaje , tipo = "info" ,duracion = 3000) => {
    //Accedo al contenedor
    let container = document.querySelector('.notif-container');
    //Crear un elemento de la notifacion
    const notif = document.createElement('div');
    // agrego clases al elemento
    notif.className = `notif-toast ${tipo}`;
    //Agrego mensaje al elemento
    notif.innerText = mensaje;
    //agregamos el elemento al contenedor
    container.appendChild(notif);
    //Activar animación de entrada
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            notif.classList.add('show');//Mostramos la notificación
        });
    });
    setTimeout(() => {
        notif.classList.remove('show');
        notif.classList.add('fade-out');
        notif.addEventListener('transitionend', () => {
            notif.remove(); //eliminar el elemento
        });
    }, duracion);
  }

render() {
  return (
    <div className="App">
        <div className="notif-container"></div>

      <Router>
        <Routes>
          <Route path="/" element={<Login notificacion={this.notifiacion} />} />
          <Route path="/empresa" element={<Empresa  notificacion={this.notifiacion}/>} />
        </Routes>
      </Router>
    </div>
  );
}

}



  

  

  

export default App;
