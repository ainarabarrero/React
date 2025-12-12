 import './Form.css'; 

function Form(props) {


    const envioFormulario = (event) => {

        event.preventDefault();

        const form = event.target;


        props.agregarIncidencia({

            titulo: form.titulo.value,

            usuario: { email: form.email.value },

            descripcion: form.descripcion.value,

            categoria: form.categoria.value,

            nivel_urgencia: form.nivel.value,

            ubicacion: form.ubicacion.value

        });


        form.reset();

    };


    return (

        <div className="container mt-4" id="fondoform">

            <div className="card p-4 shadow-sm">

                <form onSubmit={envioFormulario} className="row g-3">

                    <div className="col-md-6">

                        <label htmlFor="titulo" className="form-label">Título</label>

                        <input type="text" className="form-control" name="titulo" id="titulo" required />

                    </div>


                    <div className="col-md-6">

                        <label htmlFor="email" className="form-label">Email</label>

                        <input type="email" className="form-control" name="email" id="email" required />

                    </div>


                    <div className="col-12">

                        <label htmlFor="descripcion" className="form-label">Descripción</label>

                        <textarea className="form-control" name="descripcion" id="descripcion" rows="3" required></textarea>

                    </div>


                    <div className="col-md-6">

                        <label htmlFor="categoria" className="form-label">Categoría</label>

                        <select className="form-select" name="categoria" id="categoria" required>

                            <option value="Hardware">Hardware</option>

                            <option value="Software">Software</option>

                            <option value="Red">Red</option>

                            <option value="Otro">Otro</option>

                        </select>

                    </div>


                    <div className="col-md-6">

                        <label htmlFor="nivel" className="form-label">Nivel de urgencia</label>

                        <select className="form-select" name="nivel" id="nivel" required>

                            <option value="Baja">Baja</option>

                            <option value="Media">Media</option>

                            <option value="Alta">Alta</option>

                        </select>

                    </div>


                    <div className="col-md-6">

                        <label htmlFor="ubicacion" className="form-label">Ubicación</label>

                        <input type="text" className="form-control" name="ubicacion" id="ubicacion" required />

                    </div>


                    <div className="col-12 text-center mt-3">

                        <button type="submit" className="btn btn-primary px-4">Agregar incidencia</button>

                    </div>

                </form>

            </div>

        </div>

    );

}


export default Form; 