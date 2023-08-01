import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const register = async (userData) => {
//   const response = await axios.post(API_URL, userData);

//   if (response.data) {
//     localStorage.setItem("user", JSON.stringify(response.data)); //local storage has to be in strings
//   }

//   return response.data;
// };

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const registerHandler = async (e) => {
    const userData = { name: userName, email, password, password2: password };
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5001/api/users",
      userData
    );
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data)); //local storage has to be in strings
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
