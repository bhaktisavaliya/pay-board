import React from 'react';
import Logo from "../../assets/images/user-1.jpg";
import "./header.scss";

const Header = () => {
  return (
    <header className="header">
    <img src={Logo} alt="logo" className="img-fluid"/>
    </header>
  );
};

export default Header;
