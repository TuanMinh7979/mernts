import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../TypeScript";
import { logout } from "../../redux/actions/authAction";
const Menu = () => {
  const { authState } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const bfLoginLinks = [
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
  ];
  const afLoginLinks = [
    { label: "Home", path: "/" },
    { label: "CreateBlog", path: "/create_blog" },
  ];

  const navLinks = authState.access_token ? afLoginLinks : bfLoginLinks;

  const { pathname } = useLocation();
  const isActive = (pn: string) => {
    if (pn === pathname) {
      return "active";
    }
  };

  const handleLogout = () => {
    if (!authState.access_token) return;
    dispatch(logout(authState.access_token));
  };

  return (
    <ul className="navbar-nav  ms-auto">
      {navLinks.map((link, index) => (
        <li className={`nav-item ${isActive(link.path)}`}>
          <Link className="nav-link" to={link.path}>
            {link.label}
          </Link>
        </li>
      ))}

      {/* {authState.user?.role === "admin" &&  */}
      <li className={`nav-item ${isActive("/category")}`}>
        <Link to="/category" className="nav-link">
          Category
        </Link>
      </li>
      {/* // } */}
      {authState.user && (
        <li className="nav-item dropdown">
          <span
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              className="avatar"
              src={authState.user.avatar}
              alt={authState.user.name}
            />
          </span>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <Link
                className="dropdown-item"
                to={`/profile/${authState.user._id}`}
              >
                Profile
              </Link>

              <Link to="/" className="dropdown-item" onClick={handleLogout}>
                Logout
              </Link>
              <Link to="/info" className="dropdown-item" >
                Login Info
              </Link>
            </li>
          </ul>
        </li>
      )}
    </ul>
  );
};

export default Menu;
