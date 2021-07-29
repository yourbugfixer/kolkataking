import { useData } from "../contexts/GetData";

function Sidebar() {
  const { schedule, ordinal, Link } = useData();

  return (
    <>
      <div className="row mb-5">
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-12 mx-auto">
              <div>
                <div className="card-body text-center font-weight-normal h5">
                  <div className="row mb-1">
                    <div className="col-sm-12 text-center">
                      <h4 className="font-weight-bold">
                        <i className="fas fa-crown"></i>&nbsp; KOLKATA KING
                        &nbsp;
                        <i className="fas fa-crown"></i>
                      </h4>
                      <h5 className="font-weight-bold">
                        <i className="fas fa-clock"></i>&nbsp; Result Time Table
                        &nbsp;<i className="fas fa-clock"></i>
                      </h5>
                    </div>
                  </div>
                  <div className="row border border-2">
                    <table className="table table-striped table-hover mb-0">
                      <tbody>
                        {schedule &&
                          schedule.map((val, index) => (
                            <tr key={val.SCHEDULE_ID}>
                              <td>
                                {index + 1}
                                <sup>{ordinal(index + 1)}</sup> Bazi
                              </td>
                              <td>{val.TIME}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-sm-12 ">
          <div className="">
            <div className="card-body">
              <div className="card-title text-center">
                <h4 className="font-weight-bold text-black-50">Navigate</h4>
              </div>
              <div className="row mb-2 content-align-justify">
                <div className="col-sm-12 mx-auto text-center">
                  <Link
                    to="/results"
                    className="btn mr-2 mb-2 btn-rounded bg-primary text-white"
                  >
                    Old Results
                  </Link>
                  <Link
                    to="/tips"
                    className="btn mr-2 mb-2 btn-rounded bg-info text-white"
                  >
                    Kolkata King Tips
                  </Link>

                  <Link
                    to="/pattilist"
                    className="btn mb-2 btn-rounded bg-secondary text-white"
                  >
                    Kolkata King Patti List
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
