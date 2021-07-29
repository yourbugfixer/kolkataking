import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Banner from "../assets/images/banner.png";

function Navbar() {
  const isMobile = useMediaQuery({ query: "(max-width: 576px)" });
  const toggle = () => {
    if (isMobile) {
      const toggle = document.querySelector(".navbar-toggler");
      const sidebar = document.querySelector("#navbarSupportedContent");
      toggle.classList.add("collapsed");
      toggle.setAttribute("aria-expanded", "false");
      sidebar.classList.toggle("show");
    }
  };

  return (
    <header>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center py-1">
          <img src={Banner} alt="bannerimage" className="img-fluid" />
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand font-weight-bold text-white">
            Kolkata &nbsp; <i className="fas fa-crown"></i>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav text-center ml-md-auto">
              <li className="nav-item m-1">
                <NavLink exact to="/" activeClassName="active" onClick={toggle}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item m-1">
                <NavLink
                  exact
                  to="/results"
                  activeClassName="active"
                  onClick={toggle}
                >
                  Old Results
                </NavLink>
              </li>
              <li className="nav-item m-1">
                <NavLink
                  exact
                  to="/tips"
                  activeClassName="active"
                  onClick={toggle}
                >
                  Kolkata King Tips
                </NavLink>
              </li>
              <li className="nav-item m-1">
                <NavLink
                  exact
                  to="/pattilist"
                  activeClassName="active"
                  onClick={toggle}
                >
                  Kolkata king Patti List
                </NavLink>
              </li>
              <li className="nav-item m-1">
                <NavLink
                  exact
                  to="/login"
                  activeClassName="active"
                  onClick={toggle}
                >
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
