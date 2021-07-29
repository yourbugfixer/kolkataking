import { useData } from "../contexts/GetData";
import { Helmet } from "react-helmet";
import Sidebar from "../Components/Sidebar";
import { compareDates, findOcc } from "../Components/Utility";
import { oldresultSchema } from "../admin/components/Validation";

function Results(props) {
  const {
    isMobile,
    useForm,
    useState,
    useEffect,
    yupResolver,
    api,
    GetCurrentDate,
  } = useData();

  const { month, year } = props.match.params;

  var date = new Date();
  date.setMonth(date.getMonth() - 1);
  const prvmonth =
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

  const [prvresult, setprvResult] = useState([]);

  useEffect(() => {
    api
      .post("/result/byMonth", {
        result_month: month ? month : prvmonth,
        result_year: year ? year : date.getFullYear(),
      })
      .then((res) => {
        setprvResult(res.data.data);
      });
  }, []);

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(oldresultSchema),
  });

  const onSubmit = (data) => {
    props.history.push({ pathname: "/results" });
    const result_year = data.result_date.split("-")[0];
    const result_month = data.result_date.split("-")[1];
    console.log(result_month, result_year);
    api
      .post("/result/byMonth", {
        result_month: result_month,
        result_year: result_year,
      })
      .then((res) => {
        setprvResult(res.data.data);
      });
  };
  let datearr = [];
  prvresult.map((val, i) => {
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
      <Helmet>
        <title>Kolkata King - Game result</title>
        <meta name="title" content="Kolkata King - Game result" />
        <meta
          name="description"
          content="Kolkata King result- Game result sbse pahle"
        />
        <meta
          name="keywords"
          content="Result,Kolkataking result, Kolkata King result, Game result"
        />
      </Helmet>
      <div className="container-fluid my-4">
        <div className="row d-flex justify-content-around">
          <div className="col-sm-8 mt-md-3 ml-md-3">
            <div className="col-sm-12 card mb-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group row d-flex justify-content-around my-3">
                  <label
                    htmlFor="result_date"
                    className="col-auto col-form-label"
                  >
                    Select Month
                  </label>
                  <div className="col-auto">
                    <input
                      type="month"
                      name="result_date"
                      id="result_date"
                      ref={register}
                      className="form-control"
                      max={`${GetCurrentDate().split("/")[0]}-${
                        GetCurrentDate().split("/")[1]
                      }`}
                      defaultValue={
                        month && year
                          ? `${year}-${month}`
                          : `${date.getFullYear()}-${prvmonth}`
                      }
                    />
                    {errors.result_date && (
                      <span className="ml-3 text-danger">
                        {errors && errors.result_date?.message}
                      </span>
                    )}
                  </div>
                  <div className="col-md-auto col-sm-12 mt-3 mt-sm-0">
                    <button className="btn btn-info date_btn px-4">
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="row">
              <div className="col-sm-12 mb-3 mb-sm-0">
                {datearr && datearr.length > 0 ? (
                  datearr.map((val, i) => (
                    <table
                      className="table table-bordered table-sm text-center mb-3"
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
                          {prvresult.map(
                            (item, index) =>
                              compareDates(datearr[i], item.DATE) && (
                                <td key={`${item.PATTI_NO}_${index}`}>
                                  {item.PATTI_NO} <br /> {item.PATTI_VALUE}
                                </td>
                              )
                          )}
                          {printRow(
                            findOcc(prvresult, "RESULT_DATE")[i].occurrence
                          )}
                        </tr>
                      </tbody>
                    </table>
                  ))
                ) : (
                  <p className="text-center text-danger mt-5">
                    No record found !!
                  </p>
                )}
              </div>
            </div>
            {isMobile && <hr />}
          </div>

          <div className="col">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}

export default Results;
