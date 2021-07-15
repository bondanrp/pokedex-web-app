import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";

export default function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/my-pokemon">My Pokemon</Link>
    </div>
  );
}
