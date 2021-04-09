import React from "react";
import { Link } from "react-router-dom";
import { useVideo } from "../context/videoLibraryContext";

import logo from '../assets/logo.png'
const Navbar = () => {
  const { state } = useVideo();
  return (
    <div className="navbar">
      <span>
        <Link className="links" to="/">
          <img src={logo} className="brand-logo" alt="logo" />
        </Link>
      </span>
      <span>
        <Link className="links" to="/saved">
          Saved ({state.savedVideos.length})
        </Link>
        <Link className="links" to="/history">
          History ({state.history.length})
        </Link>
        <Link className="links" to="/playlists">
          Playlists
        </Link>
      </span>
    </div>
  );
};

export default Navbar;
