import { useData } from "../../contexts/GetData";
import Title from "../components/pageTitle";
import { Pagination, Paginate } from "../../Components/pagination";
import { InputRow, Button } from "../../Components/formComponents";
import { scheduleSchema, classes } from "../components/Validation";

function Admin_schedule() {
  const {
    schedule,
    setSchedule,
    Swal,
    api,
    yupResolver,
    useForm,
    GetCurrentDate,
    useState,
  } = useData();

  const [pageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const { length: count } = (schedule && schedule) || 0;

  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onBlur",
    resolver: yupResolver(scheduleSchema),
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onSubmit = (data) => {
    api
      .post("/schedule", {
        result_time: GetCurrentDate() + " " + data.result_time,
      })
      .then((res) => {
        if (res.data.success === 1) {
          reset();
          setSchedule(res.data.data);
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

  function handleDelete(schedule_id) {
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
        api.delete(`/schedule/${schedule_id}`).then((res) => {
          if (res.data.success === 1) {
            setSchedule(res.data.data);
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
  const schedules = Paginate(schedule, currentPage, pageSize);
  return (
    <section>
      <Title title="SCHEDULE" />
      <div className="col-sm-12 pb-3">
        <div className="row d-flex flex-row justify-content-between">
          <div className="col-sm-5 cards mb-3 mb-sm-0">
            <div className="card-header bg-white">New Schedule</div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <InputRow
                  ref={register}
                  name="schdeule_id"
                  label="ID"
                  readOnly={true}
                  value={(schedule && schedule.length + 1) || 1}
                />

                <InputRow
                  type="time"
                  ref={register}
                  name="result_time"
                  label="Time"
                  classes={classes}
                  error={!!errors.result_time}
                  helperText={errors?.result_time?.message}
                />
                <Button
                  cname="text-center mt-5"
                  children="Save Schedule"
                  className="btn btn-primary w-sm-100"
                />
              </form>
            </div>
          </div>

          <div className="col-sm-6 cards">
            <table className="table table-hover text-center">
              <thead>
                <tr>
                  <th scope="col">Time</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {schedule && schedules.length > 0 ? (
                  schedules.map((val, index) => (
                    <tr key={val.SCHEDULE_ID}>
                      <td>{val.TIME}</td>

                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(val.SCHEDULE_ID)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>No record found</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div>
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

export default Admin_schedule;
