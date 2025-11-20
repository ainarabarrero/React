import Header from '../header/Header';
import Footer from '../footer/Footer';
import MiLista from '../lista/IncidentList';
import Form from '../Form';
import React, {useState} from "react";
import Fondo from '../img/fondo-vector-monocromo-blanco-abstracto-folleto-diseno-folleto-sitio-web-fondo-pantalla-blanco-geometrico-pagina-inicio-presentacion-certificado_249611-5879.avif' 

function App() {
  const [incidencias, setIncidencia] = useState([
  

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
    ]);

   const agregarIncidencia=( titulo_nuevo, usuario_nuevo, descripcion_nuevo, categoria_nuevo,nivel_urgencia_nuevo, ubicacion_nuevo)=>{
      const fecha= new Date();
      const year = fecha.getFullYear();
      const month = String(fecha.getMonth()+1).padStart(2,'0');
      const day = String (fecha.getDate()).padStart(2,'0');
      const fecha_formateada= year+ "-" + month + "-" + day;
      const nueva_incidencia= {
        id_incidencia: incidencias.length +1,
        id_usuario: usuario_nuevo,
        titulo: titulo_nuevo,
        descripcion: descripcion_nuevo,
        categoria: categoria_nuevo,
        nivel_urgencia: nivel_urgencia_nuevo,
        fecha_registro: fecha_formateada,
        estado: "Abierta",
        ubicacion: ubicacion_nuevo
      }
      setIncidencia([...incidencias,nueva_incidencia]);
      console.log("Datos recibidos",nueva_incidencia);
      
    }

  return (
    <div className='card' style={{backgroundImage: `url(${Fondo})`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
    <Header/>
    <h2 className='mb-4 text-center'>Mi aplicación </h2>
     
    <div className="container-fluid mt-4 row">
      <main className='col-md-6'>
        <p>Esta aplicacion muestra el contenido almacenado en mi app</p>
          <MiLista incidencias={incidencias}/>
          </main>
        <aside className='col-md-6'>
       <Form agregarIncidencia={agregarIncidencia}/>
        </aside>
    </div>
    <Footer/>
    </div>

  );
}

export default App;
