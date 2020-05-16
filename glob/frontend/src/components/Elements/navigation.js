import React from "react";
import { Link } from "react-router-dom";
import "./navigation.css";

const Navigation = ({ children, animation_class }) => {
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark bg-dark ${animation_class}`}
      role="navigation"
    >
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav">{children}</ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
