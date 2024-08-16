import React from 'react';
import Logo from "../../assets/images/logo.png";
import "./footer.css";

// Footer Component
const Footer = () => {
  return (
    <footer className="footer-main">
        <div className="row">
          <div className="col-12">
            <div className="footer-image">
              <a className="logo">
                <img src={Logo} alt="logo" className="img-fluid" />
              </a>
            </div>
          </div>
          <div className="col-12">
            <div className="copyright">
              <p>
                © Copyright 2024 | <a>Bhakti Savaliya's design</a> | All rights reserved.
              </p>
            </div>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
