import React from 'react';
import Logo from "../../assets/images/logo.png";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
    <img src={Logo} alt="logo" className="img-fluid"/>
    </header>
  );
};

export default Header;
