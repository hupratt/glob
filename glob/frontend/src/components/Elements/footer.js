import React from "react";
import "./footer.css";

const Footer = ({ animation_class }) => {
  return (
    <footer className={`py-5 bg-transparent ${animation_class}`}>
      <div className="container">
        <p className="m-0 text-center text-white">Copyright © 2020</p>
      </div>
    </footer>
  );
};

export default Footer;
