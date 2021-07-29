import React from "react";
import { Redirect } from "react-router-dom";

function Demo() {
  const handleDelete = (page) => {
    <Redirect to="/404-notfound" />;
  };
  return (
    <div>
      <button className="btn btn-danger m-5" onClick={() => handleDelete("1")}>
        Redirect
      </button>
    </div>
  );
}

export default Demo;
