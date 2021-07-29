import React from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { logout } from "../../services/auth.service";
import Bullet from "../../assets/images/bullet.png";

function Sidebar() {
  const { url } = useRouteMatch();
  let history = useHistory();
  const isMobile = useMediaQuery({ query: "(max-width: 576px)" });

  const toggle = () => {
    if (isMobile) {
      const toggle = document.querySelector(".navbar-toggler");
      const sidebar = document.querySelector("#sidebarMenu");
      toggle.classList.add("collapsed");
      toggle.setAttribute("aria-expanded", "false");
      sidebar.classList.toggle("show");
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    logout();
    history.replace("/");
  };

  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse px-0"
    >
      <div className="sidebar-sticky">
        <header className="Sidebar-logo">
          <span>Kolkata King</span>
        </header>

        <h5 className="Sidebar_navTitle">APP</h5>

        <ul className="Sidebar_nav">
          <li className="link-wrapper LinksGroup_headerLink">
            <Link to={`${url}`} onClick={toggle}>
              <img
                src={Bullet}
                alt="lightDashboard"
                width="24px"
                height="24px"
              />
              Dashboard
            </Link>
          </li>
        </ul>

        <h5 className="Sidebar_navTitle">BAZI</h5>

        <ul className="Sidebar_nav">
          <li className="link-wrapper LinksGroup_headerLink">
            <Link to={`${url}/result`} onClick={toggle}>
              <img
                src={Bullet}
                alt="lightDashboard"
                width="24px"
                height="24px"
              />
              Results
            </Link>
          </li>
          <li className="link-wrapper LinksGroup_headerLink">
            <Link to={`${url}/schedule`} onClick={toggle}>
              <img
                src={Bullet}
                alt="lightDashboard"
                width="24px"
                height="24px"
              />
              Schedule
            </Link>
          </li>

          <li className="link-wrapper LinksGroup_headerLink">
            <Link to={`${url}/tips`} onClick={toggle}>
              <img
                src={Bullet}
                alt="lightDashboard"
                width="24px"
                height="24px"
              />
              Bazzi Tips
            </Link>
          </li>
        </ul>

        <ul className="Sidebar_downNav">
          <hr className="hr mx-auto" />
          {/* <li className="link-wrapper LinksGroup_headerLink">
          <a className="active" aria-current="page" href="#/">
            <img
              src={Bullet}
              alt="lightDashboard"
              width="24px"
              height="24px"
            />
            Admin
          </a>
        </li>
        <li className="link-wrapper LinksGroup_headerLink">
          <a className="active" aria-current="page" href="#/">
            <img
              src={Bullet}
              alt="lightDashboard"
              width="24px"
              height="24px"
            />
            Account{" "}
          </a>
        </li> */}
          <li className="link-wrapper LinksGroup_headerLink">
            <a
              className="active"
              aria-current="page"
              href="#/"
              onClick={handleClick}
            >
              <img
                src={Bullet}
                alt="lightDashboard"
                width="24px"
                height="24px"
              />
              Logout{" "}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
