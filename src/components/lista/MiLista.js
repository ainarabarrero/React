

function MiLista (props) {   

    return(
        <div className='lista'>
            <ul>
                {
                    props.incidencias.map((i)=> (
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