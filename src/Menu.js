import { Link } from "react-router-dom";

function Menu({ usuarioLogueado, onLogout }) {
  const esAdmin = usuarioLogueado?.rol?.nombre_rol === "admin";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4 rounded">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Mi aplicación</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/incidencias">Ver incidencias</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/registrar">Registrar incidencia</Link>
            </li>
            {esAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/usuarios">Gestión de usuarios</Link>
              </li>
            )}
          </ul>
          <div className="d-flex align-items-center">
            <span className="text-light me-3">
              <strong>Usuario:</strong> {usuarioLogueado.nombre || usuarioLogueado.email}
            </span>
            <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Menu;