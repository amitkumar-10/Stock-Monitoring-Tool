import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg border-bottom" style={{ backgroundColor: "#FFF" }}>
            <div className="container p-2">
                <Link className="navbar-brand" to="/">
                    <img
                        src="media/images/logo.svg"
                        style={{ width: "25%" }}
                        alt="Logo"
                    />
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
                    <ul className="navbar-nav mb-lg-0 me-auto">
                        <li className="nav-item me-3">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? "text-primary fw-semibold" : "text-dark"}`
                                }
                            >
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item me-3">
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? "text-primary fw-semibold" : "text-dark"}`
                                }
                            >
                                Login
                            </NavLink>
                        </li>

                        <li className="nav-item me-3">
                            <NavLink
                                to="/signup"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? "text-primary fw-semibold" : "text-dark"}`
                                }
                            >
                                Signup
                            </NavLink>
                        </li>

                        <li className="nav-item me-3">
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? "text-primary fw-semibold" : "text-dark"}`
                                }
                            >
                                About
                            </NavLink>
                        </li>

                        <li className="nav-item me-3">
                            <NavLink
                                to="/product"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? "text-primary fw-semibold" : "text-dark"}`
                                }
                            >
                                Product
                            </NavLink>
                        </li>
                    </ul>


                </div>
            </div>
        </nav>
    );
}

export default Navbar;
