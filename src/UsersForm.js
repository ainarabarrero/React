function UsersForm({ agregarUsuario }) {
  const envioFormulario = (event) => {
    event.preventDefault();
    const form = event.target;

    const nuevoUsuario = {
      nombre: form.nombre.value,
      email: form.email.value,
      password: form.password.value,
      rol: form.rol.value === "admin"
        ? { id: 2, nombre_rol: "admin", descripcion: "Administrador del sistema con permisos totales" }
        : { id: 1, nombre_rol: "comun", descripcion: "Usuario regular del sistema" },
      fecha_registro: new Date().toISOString().split("T")[0]
    };

    agregarUsuario(nuevoUsuario);
    form.reset();
  };

  return (
    <>
      <h3 className="text-center mb-4"><strong>Registrar usuario</strong></h3>
      <form onSubmit={envioFormulario}>
        <div>
          <label className="mb-2 form-label"><strong>Nombre</strong></label>
          <input className="mb-3 form-control" type="text" name="nombre" placeholder="Introduce el nombre" required />
        </div>
        <div>
          <label className="mb-2 form-label"><strong>Email</strong></label>
          <input className="mb-3 form-control" type="email" name="email" placeholder="Introduce el email" required />
        </div>
        <div>
          <label className="mb-2 form-label"><strong>Contraseña</strong></label>
          <input className="mb-3 form-control" type="password" name="password" placeholder="Introduce la contraseña" required />
        </div>
        <div>
          <label className="mb-2 form-label"><strong>Rol</strong></label>
          <select className="mb-3 form-control" name="rol" required defaultValue="comun">
            <option value="comun">Común</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success w-100">Registrar</button>
      </form>
    </>
  );
}

export default UsersForm;