import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
require("dotenv").config();
const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const { setLogin, loader, setLoader, isUserLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(isUserLoggedIn)
    {
      navigate('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoggedIn]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      setLoader(true);
      const response = await axios.post(
        "https://videolibrarybackend.shubambhasin.repl.co/signup",
        user
      );
      setLoader(false);
      setLogin(true);
      if (response.data.success) {
        // setErrors({
        //   email: response.data.error.email,
        //   password: response.data.error.password,
        // });
      }
      if (response.data.token) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            isUserLoggedIn: true,
            username: response.data.name,
            authToken: response.data.token,
          })
        );
        navigate("/success");
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify({
            isUserLoggedIn: false,
            username: "",
            authToken: "",
          })
        );
      }
      // navigate("/success");
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="signup block-center content-container">
      <h1 className="h2 mb1-rem">SignUp</h1>
      <form onSubmit={handleSubmit}>
        <div className="signup-container flex flex-col p1-rem">
          <div className="flex flex-col gap-01">
            <label>Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="First Name..."
              value={user.name}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-01">
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Email..."
              value={user.email}
              onChange={handleChange}
            />
            <div className="email-error">
              <small>
                <p className="f-red"> {errors.email}</p>
              </small>
            </div>
          </div>
          {/* <div className="flex flex-col gap-01">
            <label>Phone Number</label>
            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
              required
              onChange={handleChange}
            />
          </div> */}
          <div className="flex flex-col gap-01">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />
            <div className="password-error">
              <small>
                <p className="f-red"> {errors.password}</p>
              </small>
            </div>
          </div>
          {/* <div className="flex flex-col gap-01">
            <label>Re-type Password</label>
            <input
              type="password"
              name="retypepassword"
              placeholder="re-type password"
              required
              onChange={handleChange}
            />
          </div> */}
          <div className="flex aic gap-2">
            <button className="btn btn-red">
              {" "}
              {loader ? (
                <>
                  <div className="three col">
                    <div className="loader" id="loader-4">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </>
              ) : (
                "SignUp"
              )}
            </button>
            <small>
              {" "}
              Already a user ?
              <NavLink className="m1-rem" to="/login">
                Login here
              </NavLink>
            </small>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
