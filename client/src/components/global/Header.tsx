import React from "react";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";
import Menu from "./Menu";

const Header = () => {
  const { pathname } = useLocation();

  const isActive = (pn: string) => {
    if (pn === pathname) {
      return "active";
    }
  };
  return (
    <nav
      style={{ position: "sticky", top: 0, left: 0, zIndex: 9 }}
      className="navbar navbar-expand-lg navbar-light bg-light p-3"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          app
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Search></Search>
          <Menu></Menu>
        </div>
      </div>
    </nav>
  );
};

export default Header;
