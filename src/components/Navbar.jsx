import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useVideo } from "../context/videoLibraryContext";

import logo from '../assets/logo.png'
import { useAuth } from "../context/AuthContext";
import { checkLogin } from "../reducer/actions";
const Navbar = () => {
  const { login, setLogin } = useAuth()
  const { state } = useVideo();
  return (
    <div className="navbar">
      <span>
        <Link className="links" to="/">
          <img src={logo} className="brand-logo" alt="logo" />
        </Link>
      </span>
      <span className="flex gap-4">
        <Link className="links" to="/saved">
          Saved 
        </Link>
        <Link className="links" to="/history">
          History        </Link>
        <Link className="links" to="/playlists">
          Playlists
        </Link>

       <button className="btn btn-red" onClick={() => checkLogin(login, setLogin, )}> <NavLink  to="/login">{login ? "Logout" : "Login"}</NavLink></button>
      </span>
    </div>
  );
};

export default Navbar;
