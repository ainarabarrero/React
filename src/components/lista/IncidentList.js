

function MiLista (props) {   

    return(
        <div className='container mt-3 '>
            <dl>
                {
                    props.incidencias.map((i)=> (
                        <div key={i.id_incidencia} className="mb-4 pb-2 border-bottom bg-white">
                            <dt className="text-titulopersonalizado-verde">
                                <strong>Titulo:</strong> {i.titulo}<br></br>
                            </dt>

                            <dd className="text-muted" >
                                <strong>Descripcion:</strong> {i.descripcion}<br></br>
                            </dd>

                            <dd><strong>Usuario:</strong> {i.id_usuario}<br></br></dd>

                            <dd><strong>Nivel Urgencia:</strong> {i.nivel_urgencia}<br></br></dd>
                            
                            
                            
                            <dd><strong>Ubicacion:</strong> {i.ubicacion}<br></br><br></br></dd>
                        </div>
                    ))
                }
            </dl>
        </div>
    )
}

export default MiLista