import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setUser }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        setUser(null);
        navigate("login");
      }}
    >
      Logout
    </button>
  );
};

export default Logout;
