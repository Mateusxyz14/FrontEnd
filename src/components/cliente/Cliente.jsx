import React from "react";
import axios from "axios";
import { urlApi } from '../../services/apirest';
import FormularioCliente from "./FormularioCliente";
// 1. IMPORTAMOS TU NUEVO MODAL
import ModalCliente from "./ModalCliente";

class Cliente extends React.Component {

//    componentDidMount() {
  //      console.log("EMPRESA CARGADA");
    //}

    state = {
            registros: [],
            pagina_actual: 1,
            cadena_busqueda: "",
            token: localStorage.getItem('token'),
            total_paginas: 0,
            limit: 6,
            mostralModal: false,
            clienteSeleccionado: null
        }

        mostrarModalNuevo = () => {
            this.setState({
                mostralModal: false,
                clienteSeleccionado: null
            })
        }

        mostrarModalEditar = (id) => {
            this.setState({
                mostralModal: true,
                clienteSeleccionado: id
            })
        }

        cerrarModal = () => {
            this.state({mostrarModal: false})
        }

        alGuardar = () => {
            this.cargarDatos(); //Recafrgar datos
            this.cerrarModal(); // Cerrar la ventana modal
        }
    
        componentDidMount = () => {
            this.cargarDatos();
        }


        paginaSiguiente = () =>{
            if (this.state.pagina_actual < this.state.total_paginas) {
                this.setState(
                    {pagina_actual: this.state.pagina_actual + 1},
                    () => {this.cargarDatos()}
                )
            }
        }



paginaAnterior = () =>{
            if (this.state.pagina_actual > 1) {
                this.setState(
                    {pagina_actual: this.state.pagina_actual - 1},
                    () => {this.cargarDatos()}
                )
            }
        }


        cargarDatos = () => {
            let url = urlApi + "cliente?page=" + this.state.pagina_actual + "&string=" + this.state.cadena_busqueda + "&limit=" + this.state.limit;

            axios
                .get(url, {
                    headers: {
                        'Authorization': `Bearer ${this.state.token}`
                    }
                })
                .then(response => {
                    this.setState({
                        registros: response.data.data,
                        total_paginas: response.data.totalPage
                    })
                })
                .catch(error => {
                    const { notificacion } = this.props;
                    notificacion(error);
                })
        }
    

    render() {
        return (
            <div>
                

                                <div className="col-10 position-absolute top-0 start-50 translate-middle-x">
                    <h1>Datos de Cliente</h1>
                    <button className="btn btn-success" onClick={this.mostrarModalNuevo}>Nuevo registro</button>
                    <table className="table">
                        <thead>
                            <tr>
                                
                                <th scope="col">Nombre</th>
                                <th scope="col">Telefono</th>
                                <th scope="col">Email</th>
                                {/* <th scope="col">password</th> */}
                                <th scope="col">Direccion</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Fecha registro</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.registros.map((value, index) => {//Recorrer los registros
                                return (
                                    <tr key={index}>
                                        
                                        <td>{value.nombre}</td>
                                        <td>{value.telefono}</td>
                                        <td>{value.email}</td>
                                        {/* <td>{value.password}</td> */}
                                        <td>{value.direccion}</td>
                                        <td>{value.tipo}</td>
                                        <td>{value.estado}</td>
                                        <td>{value.fecha_registro}</td>
                                        <td>
                                            <svg
                                                onClick={()=>this.mostrarModalEditar(value)}
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="28"
                                                height="28"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#007aff"
                                                strokeWidth="1"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                                                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                                                <path d="M16 5l3 3" />
                                            </svg>
                                            
                                            <svg
                                                onClick={()=>this.eliminar(value.id, value.nombre)}
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="28"
                                                height="28"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#ff2d55"
                                                strokeWidth="1"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M4 7l16 0" />
                                                <path d="M10 11l0 6" />
                                                <path d="M14 11l0 6" />
                                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                            </svg>

                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <button type="button" className="btn btn-primary" onClick={this.paginaAnterior}style={{marginRight:"10px"}} >Anterior</button>
                    <input type="text" readOnly value={this.state.pagina_actual + " de " + this.state.total_paginas} style={{marginRight: "10px", textAling: "center", width: "120px"}}/>
                    <button type="button" className="btn btn-secondary" onClick={this.paginaSiguiente} >Siguiente</button>

                </div>

                {this.state.mostralModal && (
                    <div className="modal-overlay" style={modalStyles.overlay}>
                        <div className="modal-content" style={modalStyles.content}>
                            <FormularioCliente
                            clienteAEditar={this.state.clienteSeleccionado} 
                            onClose={this.cerrarModal}
                            onGuardar={this.alGuardar}
                            notificacion={this.props.notificacion}
                            />
                        </div>
                    </div>
                )}

            </div>
        );
    }
}


//Estilos para ventana modal
const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    },
    content: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto'
    }
}


export default Cliente;
