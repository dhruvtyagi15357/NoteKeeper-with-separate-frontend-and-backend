import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About.jsx";
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import NoteState from "./context/notes/noteState.jsx";
import "./App.css";
import Alert from "./components/Alert.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";


function App() {
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar className="navbar1" />
        <Alert
          alert={{
            msg: "hello",
            type: "success",
          }}
        />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
