import { useData } from "../../contexts/GetData";
import { lastThreemonth } from "../../Components/Utility";

function FullChart() {
  const { Link, useState, useEffect } = useData();
  const [months, setMonths] = useState([]);

  useEffect(() => {
    setMonths(lastThreemonth());
  }, []);

  return (
    <>
      <div className="row mb-4">
        <div className="col-sm-12">
          <h2 className="text-center text-md-left text-black-50 font-weight-bold text-uppercase">
            Check full Chart
          </h2>
        </div>
      </div>

      {months.map((val) => (
        <p
          key={val.month_value}
          className="p-2 text-center"
          style={{ backgroundColor: "#ffaa02" }}
        >
          <i>
            &#128073;
            <Link
              to={`/results/${val.month_value}/${val.year}`}
              style={{ color: "blue" }}
            >
              check {val.month_name} {val.year} Chart
            </Link>
          </i>
        </p>
      ))}
    </>
  );
}

export default FullChart;
