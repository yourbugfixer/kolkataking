import { useData } from "../../contexts/GetData";
import Title from "../components/pageTitle";
import { Pagination, Paginate } from "../../Components/pagination";
import { tipsSchema, classes } from "../components/Validation";
import { InputRow, DropDownRow, Button } from "../../Components/formComponents";

function Admin_tips() {
  const {
    isMobile,
    schedule,
    tips,
    setTips,
    Swal,
    api,
    yupResolver,
    useForm,
    GetCurrentDate,
    useState,
  } = useData();

  const [pageSize] = useState(4);
  const [isUpdate, setUpdate] = useState(false);
  const [onetip, setTip] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const { length: count } = (tips && tips) || 0;

  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onBlur",
    resolver: yupResolver(tipsSchema),
  });

  const onSubmit = (data) => {
    if (!isUpdate) {
      api
        .post("/tips", {
          tip_date: GetCurrentDate(),
          schedule_id: data.schedule_id,
          tip: data.tip,
          status: (data.status && data.status) || "-",
        })
        .then((res) => {
          if (res.data.success === 1) {
            setTips(res.data.data);
            reset();
          }
          Swal.fire({
            position: "top-end",
            icon: "success",
            text: res.data.message,
            showConfirmButton: false,
            toast: true,
            timer: 2000,
          });
        });
    } else {
      api
        .patch("/tips", {
          tip_id: onetip.TIP_ID,
          tip_date: GetCurrentDate(),
          schedule_id: data.schedule_id,
          tip: data.tip,
          status: (data.status && data.status) || "-",
        })
        .then((res) => {
          if (res.data.success === 1) {
            setUpdate(false);
            reset();
            setTips(res.data.data);
          }
          Swal.fire({
            position: "top-end",
            icon: "success",
            text: res.data.message,
            showConfirmButton: false,
            toast: true,
            timer: 2000,
          });
        });
    }
  };

  function handleDelete(tip_id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((res) => {
      if (res.isConfirmed) {
        api.delete(`/tips/${tip_id}`).then((res) => {
          if (res.data.success === 1) {
            setTips(res.data.data);
          }
          Swal.fire({
            position: "top-end",
            icon: "success",
            text: res.data.message,
            showConfirmButton: false,
            toast: true,
            timer: 2000,
          });
        });
      }
    });
  }

  function handleUpdate(tip_id) {
    setUpdate(true);
    api.get(`/tips/${tip_id}`).then((res) => {
      setTip(res.data.data);
    });
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const tip = Paginate(tips, currentPage, pageSize);

  return (
    <section>
      <Title title="TIPS" />

      <div className="col-sm-12 pb-3">
        <div className="row d-flex justify-content-between">
          <div className="col-auto cards mb-3 mb-sm-0">
            <div className="card-header bg-white">Bazi Tips</div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <DropDownRow
                  name="schedule_id"
                  label="Time"
                  option={schedule}
                  ref={register}
                  data={isUpdate && onetip.SCHEDULE_ID}
                  classes={classes}
                  error={!!errors.schedule_id}
                  helperText={errors?.schedule_id?.message}
                />

                <InputRow
                  ref={register}
                  name="tip"
                  label="Tips"
                  defaultValue={(isUpdate && onetip.TIP) || ""}
                  classes={classes}
                  error={!!errors.tip}
                  helperText={errors?.tip?.message}
                />

                {isUpdate && Object.keys(onetip).length > 0 && (
                  <div className="form-group row">
                    <div className="col-sm-3">
                      <label htmlFor="status" className="form-label">
                        Status
                      </label>
                    </div>
                    <div className="col-sm-9 text-center">
                      <input
                        type="radio"
                        name="status"
                        value="correct"
                        ref={register}
                        defaultChecked={
                          onetip.STATUS === "correct" ? true : false
                        }
                      />
                      <i className="far fa-check-circle text-success ml-2 pr-4 fa-2x"></i>
                      <input
                        type="radio"
                        name="status"
                        value="wrong"
                        ref={register}
                        defaultChecked={
                          onetip.STATUS === "wrong" ? true : false
                        }
                      />
                      <i className="far fa-times-circle text-danger ml-2 fa-2x"></i>
                    </div>
                  </div>
                )}

                <Button
                  cname="text-center pt-4"
                  className="btn btn-primary w-sm-100"
                >
                  {isUpdate ? "Update Tip" : "Save Tip"}
                </Button>
              </form>
            </div>
          </div>
          <div className="col-sm-7 cards">
            <table className="table table-hover text-center">
              <thead>
                <tr>
                  <th scope="col">Time</th>
                  <th scope="col">Tips</th>
                  <th scope="col">Status</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {tip.length > 0 ? (
                  tip.map((val) => (
                    <tr key={val.TIP_ID}>
                      <td>{val.TIME}</td>
                      <td>{val.TIP} </td>
                      <td>
                        {val.STATUS === "correct" && (
                          <i className="far fa-check-circle text-success"></i>
                        )}
                        {val.STATUS === "wrong" && (
                          <i className="far fa-times-circle text-danger"></i>
                        )}
                        {val.STATUS !== "correct" &&
                          val.STATUS !== "wrong" &&
                          val.STATUS}
                      </td>
                      <td>
                        {!isUpdate && (
                          <button
                            className="btn btn-sm btn-info m-2"
                            onClick={() => handleUpdate(val.TIP_ID)}
                          >
                            Update
                          </button>
                        )}
                        {isMobile && <br />}
                        {!isUpdate && (
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(val.TIP_ID)}
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>No record Found</td>
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

export default Admin_tips;
