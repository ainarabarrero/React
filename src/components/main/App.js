import './App.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import React from 'react';
import MiLista from '../lista/MiLista';
import Form from '../Form';

class App extends React.Component {
  state = {
    incidencias: [
  

        {
            id_incidencia: 1,
            id_usuario: "gme60348",
            titulo:"Proyecto averiado en el aula 2",
            descripcion:"Proyecto averiado en el aula 2",
            categoria: "Hardware",
            nivel_urgencia:"Media",
            fecha_registro: "2025-10-20",
            estado:"Abierta",
            ubicacion:"B205"
        },
        {
            id_incidencia: 2,
            id_usuario: "gme60348",
            titulo:"Ordenador no enciende",
            descripcion:"Ordenador no enciende",
            categoria: "Hardware",
            nivel_urgencia:"Alta",
            fecha_registro: "2025-10-20",
            estado:"Abierta",
            ubicacion:"B105"
        },
        {
            id_incidencia: 3,
            id_usuario: "gme60348",
            titulo:"Impresora sin conexión",
            descripcion:"Impresora sin conexión",
            categoria: "Hardware",
            nivel_urgencia:"Media",
            fecha_registro: "2025-10-20",
            estado:"Abierta",
            ubicacion:"B104"
        },
        {
            id_incidencia: 4,
            id_usuario: "gme60348",
            titulo:"Wifi no disponible",
            descripcion:"Wifi no disponible",
            categoria: "Hardware",
            nivel_urgencia:"Alta",
            fecha_registro: "2025-10-20",
            estado:"Abierta",
            ubicacion:"B106"
        }
    ]}

   agregarIncidencia=( titulo_nuevo, usuario_nuevo, descripcion_nuevo, categoria_nuevo,nivel_urgencia_nuevo, ubicacion_nuevo)=>{
      const fecha= new Date();
      const year = fecha.getFullYear();
      const month = String(fecha.getMonth()+1).padStart(2,'0');
      const day = String (fecha.getDate()).padStart(2,'0');
      const fecha_formateada= year+ "-" + month + "-" + day;
      const nueva_incidencia= {
        id_incidencia: this.state.incidencias.length +1,
        id_usuario: usuario_nuevo,
        titulo: titulo_nuevo,
        descripcion: descripcion_nuevo,
        categoria: categoria_nuevo,
        nivel_urgencia: nivel_urgencia_nuevo,
        fecha_registro: fecha_formateada,
        estado: "Abierta",
        ubicacion: ubicacion_nuevo
      }
      console.log("Nueva incidencia",nueva_incidencia);
      this.setState({incidencias:[...this.state.incidencias, nueva_incidencia]})
    }
  render(){
  return (
    <>
    <Header/>
    <h2>Mi aplicacion </h2>
     <p>Este es mi contenido de la app</p>
    <div className="Contenedor-incidencias">
      <main>
          <MiLista incidencias={this.state.incidencias}/>
          </main>
        <aside>
       <Form agregarIncidencia={this.agregarIncidencia}/>
        </aside>
    </div>
    <Footer/>
    </>

  );
}
}
export default App;
