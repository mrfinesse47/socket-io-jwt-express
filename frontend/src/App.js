import "./App.css";
import { useEffect, useState, useMemo } from "react";
import Register from "./pages/Register";
import Logout from "./components/Logout";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useStateWithLocalStorage from "./hooks/useStateWithLocalStorage";
import io from "socket.io-client";

function App() {
  const [user, setUser] = useStateWithLocalStorage("user", null);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    console.log("user");
    if (user) {
      setSocket(
        io("http://localhost:5001", {
          auth: {
            token: user,
          },
        })
      );
    }
  }, [user]);
  console.log(JSON.stringify(user));

  // useEffect(() => {
  //   setSocket(io.connect("http://localhost:5001", { query: { user } }));
  // }, [user]);

  return (
    <div className="App">
      <Router>
        <header className="site-header">
          <h2>Test App</h2>
          {user && <Logout setUser={setUser} />}
        </header>
        <Routes>
          <Route
            path="/register"
            element={<Register user={user} setUser={setUser} socket={socket} />}
          />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} socket={socket} />}
          />
          <Route path="/" element={<Chat user={user} socket={socket} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
