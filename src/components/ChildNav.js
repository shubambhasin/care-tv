import React from "react";
import { Link } from "react-router-dom";
import { useSidebar } from "../context/sidebarContext";

const ChildNav = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  return (
    <div
      className={`${sidebarOpen && "child-nav"} ${
        !sidebarOpen && "child-nav-full"
      }`}
    >
      <Link className="links bold categories" to="/">
        Categories:
      </Link>
      <span className="links-container">
        <Link className="links child-nav-item" to="/">
          Child Care
        </Link>
        <Link className="links child-nav-item" to="/">
          Mothers Care
        </Link>
        <Link className="links child-nav-item" to="/">
          Pregnancy
        </Link>
        <Link className="links child-nav-item" to="/">
          Baby food
        </Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>Toggle</button>
      </span>
    </div>
  );
};

export default ChildNav;
