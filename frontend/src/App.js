import "./App.css";
import { useState, useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useStateWithLocalStorage from "./hooks/useStateWithLocalStorage";

function App() {
  const [user, setUser] = useStateWithLocalStorage("user", null);
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/register"
            element={<Register />}
            user={user}
            setUser={setUser}
          />
          <Route
            path="/login"
            element={<Login />}
            user={user}
            setUser={setUser}
          />
          <Route path="/" element={<Chat />} user={user} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
