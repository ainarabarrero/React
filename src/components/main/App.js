 import Header from '../header/Header';

import Footer from '../footer/Footer';

import IncidentList from '../lista/IncidentList';

import Form from '../Form';

import React, { useEffect, useState } from "react";

import Fondo from '../img/fondo-vector-monocromo-blanco-abstracto-folleto-diseno-folleto-sitio-web-fondo-pantalla-blanco-geometrico-pagina-inicio-presentacion-certificado_249611-5879.avif'; 

 function App() {

    const INCIDENCIA_API_URL = 'http://localhost:3004/incidencias';

    const USUARIO_API_URL = 'http://localhost:3004/users';

    const [usuarios, setUsuarios] = useState([]);

    const [incidencias, setIncidencias] = useState([]);


    useEffect(() => {

        const obtenerIncidencias = async () => {

            try {

                let response = await fetch(INCIDENCIA_API_URL);

                if (!response.ok) throw new Error("HTTP Error");

                const data = await response.json();

                setIncidencias(data);

            } catch (e) {

                console.error("Error al cargar las incidencias:", e);

            }

        };


        const obtenerUsuarios = async () => {

            try {

                let response = await fetch(USUARIO_API_URL);

                if (!response.ok) throw new Error("HTTP Error");

                const data = await response.json();

                console.log("Usuarios obtenidos del servidor:", data);

                setUsuarios(data);

            } catch (e) {

                console.error("Error al cargar los usuarios:", e);

            }

        };


        obtenerIncidencias();

        obtenerUsuarios();

    }, []);


    const agregarIncidencia = async (incidencia) => {

        try {

            const fecha = new Date();

            const year = fecha.getFullYear();

            const month = String(fecha.getMonth() + 1).padStart(2, '0');

            const day = String(fecha.getDate()).padStart(2, '0');

            const fecha_formateada = `${year}-${month}-${day}`;


            // Debug: ver qué usuarios tenemos y qué email buscamos

            console.log("Usuarios cargados:", usuarios);

            console.log("Email buscado:", incidencia.usuario.email);

            

            // Normalizar emails (quitar espacios y convertir a minúsculas)

            const emailBuscado = incidencia.usuario.email.trim().toLowerCase();

            let usuarioEncontrado = usuarios.find(u => u.email.trim().toLowerCase() === emailBuscado);

            

            console.log("Usuario encontrado:", usuarioEncontrado);

            

            if (!usuarioEncontrado) {

                alert(`Usuario no encontrado. Email buscado: ${emailBuscado}\nUsuarios disponibles: ${usuarios.map(u => u.email).join(', ')}`);

                return;

            }


            const nuevaIncidencia = {

                ...incidencia,

                usuario: usuarioEncontrado,

                fecha_registro: fecha_formateada,

                estado: "Abierta",

                comentarios: []

            };


            let response = await fetch(INCIDENCIA_API_URL, {

                method: 'POST',

                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify(nuevaIncidencia)

            });


            if (response.ok) {

                let data = await response.json();

                console.log("Nueva Incidencia: ", data);

                // Usar función callback para asegurar que usamos el estado más actual

                setIncidencias(prevIncidencias => [...prevIncidencias, data]);

                alert("Incidencia agregada correctamente");

            } else {

                alert("Error al agregar la incidencia");

            }

        } catch (e) {

            console.error("Falló la petición POST de la incidencia", e.message);

            alert("Error al conectar con el servidor");

        }

    }


    return (

        <div

            style={{

                backgroundImage: `url(${Fondo})`,

                backgroundSize: "cover",

                backgroundRepeat: "no-repeat",

                minHeight: "100vh"

            }}

        >

            <Header />

            <div className="container-fluid">

                <h2 className="mb-4 text-center mt-3">Mi aplicación</h2>

                <div className="row">

                    <aside className="col-md-6">

                        <div className="card p-3 mb-3 shadow-sm">

                            <h4>Lista de Incidencias</h4>

                            <p className="text-muted">Contenido almacenado en mi app</p>

                            <MiLista incidencias={incidencias} />

                        </div>

                    </aside>

                    <main className="col-md-6">

                        <Form agregarIncidencia={agregarIncidencia} />

                    </main>

                </div>

            </div>

            <Footer />

        </div>

    );

}


export default App; 