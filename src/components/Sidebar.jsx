import React from "react";
import { Link } from "react-router-dom";
import { useVideo } from "../context/videoLibraryContext";
import { FaHistory, FaSave } from "react-icons/fa";
import { AiFillLike, AiTwotoneDislike } from "react-icons/ai";
import { MdPlaylistAdd } from "react-icons/md";
const Sidebar = () => {
  const { state } = useVideo();
  return (
    <div className="sidebar">
      <span className="sidebar-container">
        <Link className="links flex aic gap-2" to="/saved">
          <FaSave /> Saved
        </Link>

        <Link className="links flex aic gap-2" to="/liked">
          <AiFillLike /> Liked
        </Link>
        <Link className="links flex aic gap-2" to="/unliked">
          <AiTwotoneDislike /> Unliked
        </Link>
        <Link className="links flex aic gap-2" to="/history">
          <FaHistory /> History
        </Link>
        <Link className="links flex aic gap-2" to="/playlist">
          <MdPlaylistAdd /> Playlists
        </Link>
        
      </span>
    </div>
  );
};

export default Sidebar;
