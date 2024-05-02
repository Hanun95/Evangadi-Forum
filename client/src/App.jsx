import { useState, useEffect, createContext, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "./axiosConfig";

export const AppState = createContext();

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const checkUser = useCallback(async () => {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUser(data);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AppState.Provider>
  );
}

export default App;
