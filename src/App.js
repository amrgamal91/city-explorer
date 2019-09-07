import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import Container from "./components/Container";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="bg">
      <AppNavbar />
      <Container />
      <Footer />
    </div>
  );
}

export default App;
