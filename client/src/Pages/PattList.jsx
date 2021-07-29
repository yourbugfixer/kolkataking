import React from "react";
import { Helmet } from "react-helmet";
import PattiChart from "../assets/images/patti-chart.png";

function PattList() {
  return (
    <>
      <Helmet>
        <title>Kolkata King - Patti List</title>
        <meta name="title" content="Kolkata King - Patti List" />
        <meta
          name="description"
          content="Kolkata King patti list- Game tips from experts. Play and win 100% guarantee"
        />
        <meta
          name="keywords"
          content="Patti list,pattilist,Kolkataking pattilist, Kolkata King pattilist"
        />
      </Helmet>
      <div className="container mt-4 mb-4">
        <div className="row mb-3">
          <div className="col-sm-12">
            <h2 className="text-black-50 font-weight-bold text-center">
              Kolkata King Patti List
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8 mx-auto border pt-2 pb-2 border-2">
            <img className="img-fluid" src={PattiChart} alt="patti chart" />
          </div>
        </div>
      </div>
    </>
  );
}

export default PattList;
