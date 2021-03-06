import React from "react";
import { Link } from "react-router-dom";
import { useVideo } from "../context/videoLibraryContext";
import { FaHistory, FaSave } from "react-icons/fa";
import { AiFillLike, AiTwotoneDislike } from "react-icons/ai";
import { MdPlaylistAdd } from "react-icons/md";
import { useSidebar } from "../context/sidebarContext";
const Sidebar = () => {
  const { state } = useVideo();
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  return (
    <>
      <div className="sidebar">
        <span className="sidebar-container">
          <Link className="links flex aic gap-2 links-hover" to="/saved">
            <FaSave /> Saved
          </Link>

          <Link className="links flex aic gap-2 links-hover" to="/liked">
            <AiFillLike /> Liked
          </Link>
         
          <Link className="links flex aic gap-2 links-hover" to="/history">
            <FaHistory /> History
          </Link>
          <Link className="links flex aic gap-2 links-hover" to="/playlist">
            <MdPlaylistAdd /> Playlists
          </Link>
        </span>
      </div>
    </>
  );
};

export default Sidebar;
