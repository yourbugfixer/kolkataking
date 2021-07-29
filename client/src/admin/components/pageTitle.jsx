import React from "react";

const PageTitle = ({ title, children }) => {
  return (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-down">
      <h1 className="page_title">{title}</h1>
      {children}
    </div>
  );
};

export default PageTitle;
