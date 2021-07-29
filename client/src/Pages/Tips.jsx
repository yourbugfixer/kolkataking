import { useData } from "../contexts/GetData";
import { Helmet } from "react-helmet";

function Tips() {
  const { useState, useEffect, api, GetCurrentDate, ordinal } = useData();
  const [tips, setTips] = useState([]);

  useEffect(() => {
    api
      .post("/tips/byDate", {
        tip_date: GetCurrentDate(),
      })
      .then((res) => {
        setTips(res.data.data);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Kolkata King - Game Tips</title>
        <meta name="title" content="Kolkata King - Game Tips" />
        <meta
          name="description"
          content="Kolkata King tips- Game tips from experts. Play and win 100% guarantee"
        />
        <meta name="keywords" content="Kolkataking tips, Kolkata King tip" />
      </Helmet>
      <div className="container mt-4 tips_wrapper">
        <div className="row mb-4">
          <div className="col-sm-12 text-center">
            <h5 className="font-weight-normal mb-3">
              Yaha par Aapko Kolkata king Game ka Har Bazi ka Tips Deya Jata Ha
              Experts ka Dwara. Khelo or Jito 100% guarantee ka sath.
            </h5>
            <h2 className="font-weight-bold text-black-50 ">
              Kolkata King Tips
            </h2>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-sm-6 mx-auto">
            <ul>
              {tips.length > 0 ? (
                tips.map((val, index) => (
                  <li className="font-weight-normal mb-3" key={val.TIP_ID}>
                    {index + 1}
                    <sup>{ordinal(index + 1)}</sup> Bazi Tips –{" "}
                    {`{ ${val.TIP} }`} &nbsp;
                    {val.STATUS === "correct" && (
                      <i className="far fa-check-circle text-success"></i>
                    )}
                    {val.STATUS === "wrong" && (
                      <i className="far fa-times-circle text-danger"></i>
                    )}
                  </li>
                ))
              ) : (
                <p className="text-center">Sorry no tip for now</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tips;
