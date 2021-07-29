import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <section className="my-5">
      <div className="col-sm-12">
        <div className="row d-flex justify-content-center">
          <div className="col-auto">
            <div id="notfound">
              <div className="notfound">
                <div className="notfound-404">
                  <h1>404</h1>
                </div>
                <h2>Oops! This Page Could Not Be Found</h2>
                <p className="mt-3">
                  Sorry but the page you are looking for does not exist, have
                  been removed. name changed or is temporarily unavailable
                </p>
                <Link to="/">Go To Homepage</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Error;
