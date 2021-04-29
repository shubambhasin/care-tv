import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {

  const { setLogin, user,username, setUsername, password, setPassword } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === user.name && password === user.password) {
      setLogin(true);
    } else {
      setLogin(false);
      alert("Username / password incorrect");
    }
  };

  return (
    <div className="login content-container">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
};
export default Login;
