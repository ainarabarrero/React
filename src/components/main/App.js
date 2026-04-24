import Header from '../header/Header';
import Footer from '../footer/Footer';
import MiLista from '../lista/IncidentList';
import Form from '../Form';
import Login from '../Login';
import React, { useState, useEffect } from "react";
import Fondo from '../img/fondo-vector-monocromo-blanco-abstracto-folleto-diseno-folleto-sitio-web-fondo-pantalla-blanco-geometrico-pagina-inicio-presentacion-certificado_249611-5879.avif'

const LOGIN_API_URL = "http://localhost:3004/login";
const USERS_API_URL = "http://localhost:3004/users";

function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [incidencias, setIncidencia] = useState([
    {
      id_incidencia: 1,
      id_usuario: "gme60348",
      titulo: "Proyecto averiado en el aula 2",
      descripcion: "Proyecto averiado en el aula 2",
      categoria: "Hardware",
      nivel_urgencia: "Media",
      fecha_registro: "2025-10-20",
      estado: "Abierta",
      ubicacion: "B205"
    }
  ]);

  // 1. Cargar lista de usuarios al arrancar
  useEffect(() => {
    fetch(USERS_API_URL)
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error("Error cargando usuarios:", err));
  }, []);

  // 2. Persistencia manual (Sin librerías)
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && usuarios.length > 0) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const decoded = JSON.parse(jsonPayload);
        const usuarioEncontrado = usuarios.find(u => u.email === decoded.email);
        
        if (usuarioEncontrado) {
          setUsuarioLogueado(usuarioEncontrado);
        }
      } catch (error) {
        localStorage.removeItem("authToken");
      }
    }
  }, [usuarios]);

  const onLogin = async (email, password) => {
    try {
      const response = await fetch(LOGIN_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Credenciales incorrectas");

      const userData = await response.json();
      localStorage.setItem("authToken", userData.accessToken);
      localStorage.removeItem("usuarioLogin"); // Limpieza de la clave antigua
      setUsuarioLogueado(userData.user);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const onLogout = () => {
    localStorage.removeItem("authToken");
    setUsuarioLogueado(null);
  };

  const agregarIncidencia = (titulo, usuario, descripcion, categoria, urgencia, ubicacion) => {
    const nueva = {
      id_incidencia: incidencias.length + 1,
      id_usuario: usuario,
      titulo, descripcion, categoria, nivel_urgencia: urgencia,
      fecha_registro: new Date().toISOString().split("T")[0],
      estado: "Abierta", ubicacion
    };
    setIncidencia([...incidencias, nueva]);
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        backgroundImage: `url(${Fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <Header />

      <div className="container flex-grow-1 d-flex align-items-center justify-content-center">
        
        {!usuarioLogueado ? (
          <div className="col-12 col-md-4">
            <Login onLogin={onLogin} />
          </div>
        ) : (
          <div className="row w-100 justify-content-center align-items-start g-4 py-5">
            
            <main className="col-md-7">
              <div className="card p-4 shadow-sm bg-white">
                <p className="d-flex justify-content-between align-items-center">
                  <span><strong>Usuario:</strong> {usuarioLogueado.nombre || usuarioLogueado.email}</span>
                  <button className="btn btn-outline-danger btn-sm" onClick={onLogout}>Cerrar sesión</button>
                </p>
                <hr />
                <MiLista incidencias={incidencias} />
              </div>
            </main>

            <aside className="col-md-5">
              <div className="card p-4 shadow-sm bg-white">
                <Form agregarIncidencia={agregarIncidencia} />
              </div>
            </aside>
          </div>
        )}
        
      </div>

      <Footer />
    </div>
  );
}

export default App;