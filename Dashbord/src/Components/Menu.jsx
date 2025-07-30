import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Menu = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("USER");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setUserName(user.name);
    }
  }, []);

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {      /// logout 
    localStorage.removeItem("token"); 
    window.location.href = 'http://localhost:5173'
  };

  return (
    <div className="menu-container">
      <img src="media/image/xing.png" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <NavLink to="/" style={{ textDecoration: "none" }} className={({ isActive }) => ` ${isActive ? "text-primary fw-semibold" : "text-dark"}`}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" style={{ textDecoration: "none" }} className={({ isActive }) => ` ${isActive ? "text-primary fw-semibold" : "text-dark"}`}>
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/holding" style={{ textDecoration: "none" }} className={({ isActive }) => ` ${isActive ? "text-primary fw-semibold" : "text-dark"}`}>
              Holdings
            </NavLink>
          </li>
          <li>
            <NavLink to="/positions" style={{ textDecoration: "none" }} className={({ isActive }) => ` ${isActive ? "text-primary fw-semibold" : "text-dark"}`}>
              Positions
            </NavLink>
          </li>
          <li>
            <NavLink to="/funds" style={{ textDecoration: "none" }} className={({ isActive }) => ` ${isActive ? "text-primary fw-semibold" : "text-dark"}`}>
              Funds
            </NavLink>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">{userName.slice(0, 2).toUpperCase()}</div>
          <p className="username">{userName}</p>
          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
