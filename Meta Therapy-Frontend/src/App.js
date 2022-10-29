import "./App.css";

// Components

import Navbar from "./components/Navigation/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";

// Exports
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
