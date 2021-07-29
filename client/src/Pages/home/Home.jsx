import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Sidebar from "../../Components/Sidebar";
import TodayResult from "./TodayResult";
import Previousresult from "./Previousresult";
import FullChart from "./FullChart";

function Home() {
  return (
    <>
      <Helmet>
        <title>KOLKATA KING results- Today Live- Free Tips, Patti Chart</title>
        <meta
          name="title"
          content="KOLKATA KING results- Today Live- Free Tips, Patti Chart"
        />
        <meta
          name="description"
          content="KOLKATA KING results live &#9989; Sabse pahle &#10084;&#65039; Today's All Bazi Tips &#11088; Patti Chart, Old results ..."
        />
      </Helmet>
      <div className="container-fluid my-4">
        <div className="row d-flex justify-content-around">
          <div className="col-sm-7">
            <div className="row mb-5">
              <div className="col-sm-7 mx-auto text-center">
                <Link
                  to="/tips"
                  className="font-weight-bold text-danger blinking-text"
                >
                  <i className="fas fa-hand-point-right"></i>&nbsp; Kolkata King
                  Bazi Tips &nbsp; <i className="fas fa-hand-point-left"></i>
                </Link>
              </div>
            </div>

            {/* Todays result section */}
            <TodayResult />

            {/* Previous result section */}
            <Previousresult />

            {/* Full chart section */}
            <FullChart />

            <div className="row mb-3">
              <div className="col-sm-12" style={{ textAlign: "justify" }}>
                <p className="text-dark font-weight-normal">
                  <span className="text-uppercase font-weight-bold">
                    KOLKATA KING
                  </span>{" "}
                  game is very popular all over the India, mostly popular in
                  West Bengal. This game is played 8 times in a single day from
                  Monday to Saturday and 4 times in a day only on Sunday. So
                  that the company publishes &nbsp;
                  <span className="text-uppercase font-weight-bold">
                    KOLKATA KING
                  </span>{" "}
                  result online 8 times in single day.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <p className="text-justify text-dark font-weight-normal">
                  No. 1 website for all Indians, who want to get First{" "}
                  <span className="text-uppercase font-weight-bold">
                    KOLKATA KING
                  </span>{" "}
                  result. This is the only official Website. There are a large
                  number of people those are playing this game and win lots of
                  money regularly.
                </p>

                <p className="text-justify text-dark font-weight-normal">
                  No one can tell the exact number or result. So, don’t believe
                  anyone, It completely depends on YOU and your LUCK.
                </p>
              </div>
            </div>
          </div>

          {/* schedule sidebar section */}
          <div className="col-sm-4 mt-5">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
