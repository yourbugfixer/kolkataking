import { useData } from "../../contexts/GetData";
import Title from "../components/pageTitle";
import { Pagination, Paginate } from "../../Components/pagination";
import { resultSchema, classes } from "../components/Validation";
import { InputRow, DropDownRow, Button } from "../../Components/formComponents";

function Results() {
  const {
    isMobile,
    schedule,
    result,
    setResult,
    Swal,
    api,
    yupResolver,
    useForm,
    GetCurrentDate,
    ordinal,
    useState,
  } = useData();

  const [pageSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const { length: count } = result;

  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onBlur",
    resolver: yupResolver(resultSchema),
  });

  const onSubmit = (data) => {
    api
      .post("/result", {
        schedule_id: data.schedule_id,
        patti_no: (data.patti_no && data.patti_no) || "***",
        patti_value: (data.patti_value && data.patti_value) || "-",
        result_date: data.result_date,
      })
      .then((res) => {
        if (res.data.success === 1) {
          reset();
          setResult(res.data.data);
        }

        Swal.fire({
          position: "top-end",
          text: res.data.message,
          icon: "success",
          showConfirmButton: false,
          toast: true,
          timer: 2000,
        });
      });
  };

  function handleDelete(result_id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/result/${result_id}`).then((res) => {
          if (res.data.success === 1) {
            setResult(res.data.data);
          }

          Swal.fire({
            position: "top-end",
            text: res.data.message,
            icon: "success",
            showConfirmButton: false,
            toast: true,
            timer: 2000,
          });
        });
      }
    });
  }
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const results = Paginate(result, currentPage, pageSize);

  return (
    <section>
      <Title title="RESULTS" />
      <div className="col-sm-12 pb-3">
        <div className="row d-flex justify-content-between">
          <div className="col-auto cards mb-3 mb-sm-0">
            <div className="card-header bg-white">New Result</div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <InputRow
                  ref={register}
                  type="date"
                  classes={classes}
                  name="result_date"
                  label="Date"
                  defaultValue={GetCurrentDate("-")}
                  error={!!errors.result_date}
                  helperText={errors?.result_date?.message}
                />

                <DropDownRow
                  name="schedule_id"
                  classes={classes}
                  label="Time"
                  option={schedule}
                  ref={register}
                  error={!!errors.schedule_id}
                  helperText={errors?.schedule_id?.message}
                />

                <InputRow
                  ref={register}
                  name="patti_no"
                  label="Bazi"
                  classes={classes}
                  error={!!errors.patti_no}
                  helperText={errors?.patti_no?.message}
                />

                <InputRow
                  ref={register}
                  classes={classes}
                  name="patti_value"
                  label="Value"
                  error={!!errors.patti_value}
                  helperText={errors?.patti_value?.message}
                />

                <Button
                  cname="text-center"
                  children="Save Result"
                  className="btn btn-primary w-sm-100"
                />
              </form>
            </div>

            <div className="card-footer text-muted">
              <small className="ml-2">
                <b>
                  <u>Time Schedule</u>
                </b>
              </small>
              <ul className="small ml-5">
                {schedule.map((val, index) => (
                  <li key={val.SCHEDULE_ID}>
                    {index + 1}
                    <sup>{ordinal(index + 1)}</sup> Bazi &nbsp;
                    <i className="fad fa-long-arrow-right"></i>&nbsp; {val.TIME}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-sm-7 cards">
            <table
              className={
                isMobile
                  ? "table table-hover table-sm text-center"
                  : "table table-hover text-center"
              }
            >
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">Bazi</th>
                  <th scope="col">Value</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {results.length > 0 ? (
                  results.map((val) => (
                    <tr key={val.RESULT_ID}>
                      <td>{val.DATE}</td>
                      <td>{val.TIME}</td>
                      <td>{val.PATTI_NO}</td>
                      <td>{val.PATTI_VALUE}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(val.RESULT_ID)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="text-center">
                    <td colSpan={6}>No Record Found</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="mt-3">
              <Pagination
                itemCount={count}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Results;
