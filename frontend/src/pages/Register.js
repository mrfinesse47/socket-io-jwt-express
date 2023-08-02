import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = ({ user, setUser, socket }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, useNavigate]);

  const registerHandler = async (e) => {
    const userData = { name: userName, email, password, password2: password };
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5001/api/users",
      userData
    );
    if (response.data) {
      setUser(response.data);
      navigate("/");
    }
  };
  return (
    <div className="register">
      <h3>Register User</h3>
      <div className="container">
        <form onSubmit={registerHandler}>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="userName"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
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
      </div>
    </div>
  );
};

export default Register;
