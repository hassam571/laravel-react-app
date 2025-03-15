import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
        Navbar
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              end
              to="/"
              className={({ isActive }) =>
                'nav-link' + (isActive ? ' active' : '')
              }
            >
              Home <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                'nav-link' + (isActive ? ' active' : '')
              }
            >
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/add-users"
              className={({ isActive }) =>
                'nav-link' + (isActive ? ' active' : '')
              }
            >
              Signup
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/list"
              className={({ isActive }) =>
                'nav-link' + (isActive ? ' active' : '')
              }
            >
              User List
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/search"
              className={({ isActive }) =>
                'nav-link' + (isActive ? ' active' : '')
              }
            >
              Search
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;