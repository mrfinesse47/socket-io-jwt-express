import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ user, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [user, useNavigate]);
  const loginHandler = async (e) => {
    const userData = { email, password };
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/users/login",
        userData
      );
      if (response.data) {
        setUser(response.data);
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="register">
      <h3>Login</h3>
      <div className="container">
        <form onSubmit={loginHandler}>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button>Submit</button>
        </form>
        <br />
      </div>
      <div className="register">
        <button
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
