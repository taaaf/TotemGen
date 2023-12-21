import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ isReadyCreate }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const renderLinkText = (path, text) => {
    return currentPath === path ? (
      <div className="navbar-brand no-margin">{text}</div>
    ) : null;
  };

  const handleHomeClick = () => {
    if (isReadyCreate && currentPath === "/") {
      window.location.href = "/";
    }
  };

  return (
    <nav className="navbar pb-1 pt-3">
      <div className="container-navbar">
        <div className="row px-4">
          <div className="col-4 text-start p-0">
            {(currentPath !== "/" || isReadyCreate) && (
              <div className="navbar-brand no-margin">
                <Link to="/" className="style-link" onClick={handleHomeClick}>
                  Home
                </Link>
              </div>
            )}
          </div>
          <div className="col-4 text-center p-0">
            {currentPath !== "/documentation" && (
              <div className="navbar-brand no-margin">
                {" "}
                <Link to="/documentation" className="style-link">
                  Documentation
                </Link>
              </div>
            )}
          </div>
          <div className="col-4 text-end p-0">
            {currentPath !== "/contribute" && (
              <div className="navbar-brand no-margin">
                <Link to="/contribute" className="style-link">
                  Contribute
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="row">
          <hr className="rule no-margin px-0" />
        </div>

        <div className="row px-4 pt-1">
          <div className="col-4 text-start p-0">
            {!isReadyCreate && renderLinkText("/", "Home")}
          </div>
          <div className="col-4 text-center p-0">
            {renderLinkText("/documentation", "Documentation")}
          </div>
          <div className="col-4 text-end p-0">
            {renderLinkText("/contribute", "Contribute")}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
