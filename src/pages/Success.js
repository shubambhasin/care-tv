import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = setInterval(() => {
      navigate("/");
    }, 2000);

    return () => clearTimeout(redirect)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="signup-success block-center container">
      <h1>Operation Successful ! </h1>
      <p>Redirecting to Home page</p>
      <div className="three col">
        <div className="loader" id="loader-4">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Success;
