import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from '../../context/auth';

import "./styles.css";

const LoginPage = () => {
  const { authenticated, user, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log('Login: \n'+  email + '\n' + password);

    await login(email, password);
    navigate("/");
  }

  return(
    <div id="login">
      <h1 className="title">Login</h1>
      <div className="form">
        <div className="field">
          <label htmlFor="email">Email:</label>
          <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="field">
          <label htmlFor="password">Senha:</label>
          <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="actions">
          <button onClick={handleLogin}>Entrar</button>
        </div>
      </div>
    </div>
  );
}

  export default LoginPage;
