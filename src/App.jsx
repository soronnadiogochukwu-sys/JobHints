import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero"
import SearchBar from "./components/SearchBar"

import './App.css'
function App() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Jobs", href: "/jobs" },
    { name: "Artisans", href: "/Artisans" },
    { name: "Employers", href: "/Employers" },
    { name: "About Us", href: "/about Us" },
    { name: "Contact", href: "/Contact" },

  ];

  const buttons = {
    login: {
      text: "Login",
      href: "/login",
    },
    signup: {
      text: "Sign Up",
      href: "/signup",
    },
  };

  return (
    <>
    <Navbar
      image="logo"
      title="JobHints"
      links={navLinks}
      buttons={buttons}
    />
    <Hero/>
    <SearchBar/>
    </>
  );
}

export default App;