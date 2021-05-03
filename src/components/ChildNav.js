import React from "react";
import { Link } from "react-router-dom";

const ChildNav = () => {
  return (
    <div className="child-nav">

      
      <Link className="links bold categories" to="/">Categories:</Link>
     <span  className="links-container">
     <Link className="links child-nav-item" to="/">Child Care</Link>
      <Link className="links child-nav-item" to="/">Mothers Care</Link>
      <Link className="links child-nav-item" to="/">Pregnancy</Link>
      <Link className="links child-nav-item" to="/">Baby food</Link>

  
     </span>
    </div>
  );
};

export default ChildNav;
