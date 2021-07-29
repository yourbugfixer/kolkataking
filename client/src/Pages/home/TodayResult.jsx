import { useData } from "../../contexts/GetData";

function TodayResult() {
  const { GetCurrentDate, useState, useEffect, api } = useData();

  function handleRefresh() {
    window.location.reload();
  }
  const [tdayresult, settdayResult] = useState([]);

  useEffect(() => {
    api
      .post("/result/byDate", {
        result_date: GetCurrentDate(),
      })
      .then((res) => {
        settdayResult(res.data.data);
      });
  }, []);

  function printRow(index) {
    var row = [];
    for (let i = index; i < 8; i++) {
      row.push(
        <td key={i}>
          *** <br /> -
        </td>
      );
    }
    return row;
  }

  return (
    <>
      <div className="row mb-3">
        <div className="col-sm-12 d-flex">
          <div className="mr-auto d-flex align-items-sm-center">
            <h2 className="banner-text text-center font-weight-bold text-uppercase">
              Today's Result
            </h2>
          </div>
          <div className="justify-content-end ml-auto">
            <button
              className="btn btn-sm btn-outline-primary p-md-2 btn-rounded font-weight-bold"
              onClick={handleRefresh}
            >
              <i className="fas fa-redo-alt"></i>&nbsp; Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="row mb-md-5 mb-4">
        <table className="table table-bordered table-sm mx-2 text-center">
          <thead>
            <tr style={{ background: "rgb(204, 191, 238" }}>
              <td colSpan={8} className="text-center">
                {GetCurrentDate().split("/").reverse().join("/")}
              </td>
            </tr>
            <tr style={{ background: "lightblue" }}>
              <th scope="col">1</th>
              <th scope="col">2</th>
              <th scope="col">3</th>
              <th scope="col">4</th>
              <th scope="col">5</th>
              <th scope="col">6</th>
              <th scope="col">7</th>
              <th scope="col">8</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {tdayresult.map((val) => (
                <td key={val.PATTI_NO}>
                  {val.PATTI_NO} <br /> {val.PATTI_VALUE}
                </td>
              ))}
              {printRow(tdayresult.length)}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TodayResult;
