import '../css/login.css'
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { urlApi } from "../service/apirest";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${urlApi}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      // Guardar el token en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.idusuarioEmpresa);

      // Navegar al dashboard
      //navigate("/dashboard");
      navigate("/cliente");
      //navigate("/rutas");
    } catch (err) {
      setError(err.message);
      console.error("Error de login:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <p className="login-subtitle">BIENVENIDO AL PROYECTO DE REACT DE LA MATERIA APLICACION PARA EL SERVIDOR WEB</p>

        {error && <p style={{ color: "#ff4d4f", marginBottom: "20px" }}>{error}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="input-group password-group">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <span 
              className="toggle-password" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>

          <button 
            type="submit" 
            className="btn-sign-in"
            disabled={loading}
          >
            {loading ? "Iniciando sesión..." : "SIGN IN"}
          </button>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" defaultChecked />
              <span>Remember Me</span>
            </label>
            <a href="#forgot" className="forgot-link">Forgot Password</a>
          </div>
        </form>     
      </div>
    </div>
  );
}
/*
function ContenorNavegacion(props) {
  let navigate = userNavigate();
  return < Login {...props} navigate={navigate} />
}
export default ContenorNavegacion;
*/
