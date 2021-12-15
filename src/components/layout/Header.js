import React from "react";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <header>
      <Navbar className="justify-content-center" bg="dark">
        <h1 style={h1Style}>BTC VS Gold Tracker</h1>
      </Navbar>
    </header>
  );
}

const h1Style = {
  color: "#ffffff",
};

export default Header;
