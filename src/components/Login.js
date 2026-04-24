import React, { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Completa todos los campos");
      return;
    }

    onLogin(email, password);
  };

  return (
    <div className="card p-4 shadow">
      <h2 className="mb-4 text-center">Iniciar sesión</h2>

      {/* ✅ FORM REAL */}
      <form onSubmit={handleSubmit}>
        
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Introduce tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="Introduce tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Entrar
        </button>

      </form>
    </div>
  );
}

export default Login;