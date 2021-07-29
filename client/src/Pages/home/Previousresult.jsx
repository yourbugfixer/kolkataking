import {
  calculateDate,
  compareDates,
  convertDate,
  findOcc,
} from "../../Components/Utility";
import { useData } from "../../contexts/GetData";

function Previousresult() {
  const { result } = useData();

  let datearr = [];
  result.map((val) => {
    if (!datearr.includes(val.DATE)) {
      datearr.push(val.DATE);
    }
  });

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
      <div className="row mb-4">
        <div className="col-sm-12">
          <h2 className="text-center text-md-left text-black-50 font-weight-bold text-uppercase">
            Previous results
          </h2>
        </div>
      </div>

      <div className="row mb-5">
        {datearr &&
          datearr.map(
            (val, i) =>
              convertDate(val) <= calculateDate(1) &&
              convertDate(val) >= calculateDate(20) && (
                <table
                  className="table table-bordered table-sm text-center mb-3 mx-2 mx-sm-0"
                  key={i}
                >
                  <thead>
                    <tr style={{ background: "rgb(204, 191, 238" }}>
                      <td colSpan={8}>{val}</td>
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
                      {result.map(
                        (item, index) =>
                          compareDates(datearr[i], item.DATE) && (
                            <td key={`${item.PATTI_NO}_${index}`}>
                              {item.PATTI_NO} <br /> {item.PATTI_VALUE}
                            </td>
                          )
                      )}
                      {printRow(findOcc(result, "RESULT_DATE")[i].occurrence)}
                    </tr>
                  </tbody>
                </table>
              )
          )}
      </div>
    </>
  );
}

export default Previousresult;
