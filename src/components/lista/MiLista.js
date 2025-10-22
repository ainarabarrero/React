import React, { useState } from "react";

function MiLista () {
    const[incidencias,setIncidencias] = useState([

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
            id_incidencia: 3,
            id_usuario: "gme60348",
            titulo:"Wifi no disponible",
            descripcion:"Wifi no disponible",
            categoria: "Hardware",
            nivel_urgencia:"Alta",
            fecha_registro: "2025-10-20",
            estado:"Abierta",
            ubicacion:"B106"
        },
    ])
;
   

    return(
        <div className='lista'>
            <ul>
                {
                    incidencias.map((i)=> (
                        <li>
                            <strong>id incidencia:</strong> {i.id_incidencia}<br></br>
                            <strong>titulo:</strong> {i.titulo}<br></br>
                            <strong>descripcion:</strong> {i.descripcion}<br></br>
                            <strong>usuario:</strong> {i.id_usuario}<br></br>
                            <strong>ubicacion:</strong> {i.ubicacion}<br></br><br></br>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default MiLista