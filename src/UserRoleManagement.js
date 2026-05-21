import UsersForm from './UsersForm';

function UserRoleManagement({ usuarios, agregarUsuario, cambiarRol, usuarioLogueado }) {
  const esAdmin = usuarioLogueado?.rol?.nombre_rol === "admin";

  if (!esAdmin) {
    return (
      <div className="card p-4 shadow-sm bg-white">
        <p className="text-center mb-0">No tienes permisos para acceder a esta sección.</p>
      </div>
    );
  }

  return (
    <div className="row g-4">
      <div className="col-md-7">
        <div className="card p-4 shadow-sm bg-white">
          <h3 className="mb-3">Listado de usuarios</h3>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.nombre}</td>
                    <td>{u.email}</td>
                    <td>{u.rol?.nombre_rol}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => cambiarRol(u.email)}
                      >
                        Cambiar rol
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="col-md-5">
        <div className="card p-4 shadow-sm bg-white">
          <UsersForm agregarUsuario={agregarUsuario} />
        </div>
      </div>
    </div>
  );
}

export default UserRoleManagement;