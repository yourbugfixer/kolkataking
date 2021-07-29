import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-center text-lg-start">
      <div className="text-center pt-3">
        <Link to="/pattilist" className="btn p-2 btn-primary">
          Kolkata King Patti List
        </Link>
      </div>

      <div className="text-center text-white-50 pt-3">
        © 2021 Copyright:
        <a className="text-light" href="https://kolkataking.site">
          KOLKATAKing.site
        </a>
      </div>
      <div className="text-center">
        Built by:
        <a className="text-white-50" href="https://www.yourbugfixers.com">
          yourbugfixers
        </a>
      </div>
    </footer>
  );
}

export default Footer;
