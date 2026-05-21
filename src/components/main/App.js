import Header from '../header/Header';
import Footer from '../footer/Footer';
import MiLista from '../lista/IncidentList';
import Form from '../Form';
import Login from '../Login';
import React, { useState, useEffect } from "react";
import Menu from '../../Menu';
import UserRoleManagement from '../../UserRoleManagement';
import { Routes, Route } from "react-router-dom";
import Fondo from '../img/fondo-vector-monocromo-blanco-abstracto-folleto-diseno-folleto-sitio-web-fondo-pantalla-blanco-geometrico-pagina-inicio-presentacion-certificado_249611-5879.avif'

const LOGIN_API_URL = "http://localhost:3004/login";
const USERS_API_URL = "http://localhost:3004/users";
const INCIDENCIAS_API_URL = "http://localhost:3004/incidencias";

function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [incidencias, setIncidencias] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resUsers = await fetch(USERS_API_URL);
        const dataUsers = await resUsers.json();
        setUsuarios(dataUsers);

        const resIncidencias = await fetch(INCIDENCIAS_API_URL);
        const dataIncidencias = await resIncidencias.json();
        setIncidencias(dataIncidencias);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    cargarDatos();
  }, []);

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
      localStorage.removeItem("usuarioLogin");
      setUsuarioLogueado(userData.user);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const onLogout = () => {
    localStorage.removeItem("authToken");
    setUsuarioLogueado(null);
  };

  const agregarIncidencia = async (titulo, usuario, descripcion, categoria, urgencia, ubicacion) => {
    const nueva = {
      id_usuario: usuario,
      titulo, 
      descripcion, 
      categoria, 
      nivel_urgencia: urgencia,
      fecha_registro: new Date().toISOString().split("T")[0],
      estado: "Abierta", 
      ubicacion
    };

    try {
      const response = await fetch(INCIDENCIAS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nueva)
      });
      
      if (response.ok) {
        const data = await response.json();
        setIncidencias([...incidencias, data]);
      }
    } catch (error) {
      alert("Error al guardar la incidencia");
    }
  };

  const cerrarIncidencia = async (id) => {
      try {
        const response = await fetch(`${INCIDENCIAS_API_URL}/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ estado: "Cerrada" })
        });
        if (response.ok) {
          const data = await response.json();
          setIncidencias(incidencias.map(inc => inc.id === id ? data : inc));
        }
      } catch (error) {
        alert("Error al cerrar la incidencia");
      }
    };


    const agregarUsuario = async (nuevoUsuario) => {
    try {
      const response = await fetch(USERS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario)
      });
      if (response.ok) {
        const data = await response.json();
        setUsuarios([...usuarios, data]);
      }
    } catch (error) {
      alert("Error al guardar el usuario");
    }
  };


  const cambiarRol = async (emailUsuario) => {
    try {
      const usuario = usuarios.find(u => u.email === emailUsuario);
      if (!usuario) return;
      const nuevoRol = usuario.rol?.nombre_rol === "admin"
        ? { id: 1, nombre_rol: "comun", descripcion: "Usuario regular del sistema" }
        : { id: 2, nombre_rol: "admin", descripcion: "Administrador del sistema con permisos totales" };
      const response = await fetch(`${USERS_API_URL}/${usuario.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rol: nuevoRol })
      });
      if (response.ok) {
        const data = await response.json();
        setUsuarios(usuarios.map(u => u.id === usuario.id ? data : u));
      }
    } catch (error) {
      alert("Error al cambiar el rol");
    }
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
  <div className="w-100 py-4">
    <Menu usuarioLogueado={usuarioLogueado} onLogout={onLogout} />
    <Routes>
      <Route path="/" element={
        <div className="card p-4 shadow-sm bg-white col-md-8 mx-auto">
          <h2 className="text-center mb-3">Bienvenido/a a la gestión de incidencias</h2>
          <p className="text-center mb-0">
            Hola <strong>{usuarioLogueado?.nombre || usuarioLogueado?.email}</strong>,
            selecciona una opción del menú para comenzar.
          </p>
        </div>
      } />
      <Route path="/incidencias" element={
        <div className="card p-4 shadow-sm bg-white">
          <MiLista
            incidencias={incidencias}
            usuarioLogueado={usuarioLogueado}
            cerrarIncidencia={cerrarIncidencia}
          />
        </div>
      } />
      <Route path="/registrar" element={
        <div className="card p-4 shadow-sm bg-white col-md-7 mx-auto">
          <Form agregarIncidencia={agregarIncidencia} />
        </div>
      } />
      <Route path="/usuarios" element={
        <UserRoleManagement
          usuarios={usuarios}
          agregarUsuario={agregarUsuario}
          cambiarRol={cambiarRol}
          usuarioLogueado={usuarioLogueado}
        />
      } />
    </Routes>
  </div>
)}
        
      </div>

      <Footer />
    </div>
  );
}

export default App;