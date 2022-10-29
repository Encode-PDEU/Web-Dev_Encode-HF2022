import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import Restaurent from "./components/Facilities/Restaurent";
import Clinic from "./components/Facilities/Clinic";
import Parks from "./components/Facilities/Parks";
import Toilets from "./components/Facilities/Toilets";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/restaurant" element={<Restaurent />} />
          <Route exact path="/clinic" element={<Clinic />} />
          <Route exact path="/parks" element={<Parks />} />
          <Route exact path="/toilets" element={<Toilets />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
