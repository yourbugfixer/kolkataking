import { useData } from "../../contexts/GetData";
import Title from "../components/pageTitle";
import { RegisterForm, PasswordForm } from "../components/ModalForms";
import {
  getRandomColor,
  createImageFromInitials,
} from "../../Components/Utility";
import { getCurrentUser } from "../../services/auth.service";

function Dashboard() {
  const { isMobile, useState, useEffect, result, Swal, api, GetCurrentDate } =
    useData();

  const [adminData, setAdmin] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const adminGlobal = await api.get("/admin");

      setAdmin(adminGlobal.data.data);
    };

    fetchData();
  }, []);
  const admin_data = getCurrentUser();

  function handleDelete(admin_id) {
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
        api.delete(`/admin/${admin_id}`).then((res) => {
          if (res.data.success === 1) {
            setAdmin(res.data.data);
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

  return (
    <>
      <Title title="DASHBOARD">
        <button
          className="btn btn-success"
          type="button"
          data-toggle="modal"
          data-target="#adminModal"
        >
          Add Admin
        </button>
      </Title>

      <div className="col-sm-12 py-4">
        <div className="row d-flex justify-content-between">
          <div className="col-md-auto col-sm-12 p-0">
            <div className={!isMobile ? "cards p-2 fixed" : "cards p-4"}>
              <div className="card-body text-center">
                <img
                  className="admin_avtar mb-3"
                  src={createImageFromInitials(
                    130,
                    (admin_data && admin_data.admin_name) || "RR",
                    getRandomColor()
                  )}
                  alt="admin"
                />
                <h3>
                  {(admin_data && admin_data.admin_name.toUpperCase()) ||
                    "ADMIN NAME"}
                </h3>
                <br />
                <p>
                  Email:{" "}
                  {(admin_data && admin_data.admin_email) || "Admin email"}
                </p>
                <p>Password: **********</p>

                <button
                  className="btn btn-info mt-3 px-3 py-2"
                  data-toggle="modal"
                  data-target="#passwordModal"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>

          <div className="col-sm-8 p-0">
            <div className="col-sm-12">
              <div className="row d-flex justify-content-between">
                <div className="col-sm-5 cards d-flex align-items-center my-3 my-sm-0">
                  <div className="numbers">
                    {GetCurrentDate().split("/").reverse().join("/")}
                  </div>

                  <div className="iconBox">
                    <i className="fas fa-calendar-alt" />
                  </div>
                </div>
                <div className="col-sm-6 cards d-flex">
                  <div>
                    <div className="numbers">{result.length}</div>
                    <div className="cardName">Total result Published</div>
                  </div>

                  <div className="iconBox">
                    <i className="fas fa-clipboard-list" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-12 cards mt-3 mt-md-4">
              <div className="card-body">
                <table className="table table-hover text-center">
                  <thead>
                    <tr>
                      {!isMobile && <th scope="col">#</th>}
                      <th scope="col">Admin Name</th>
                      {!isMobile && <th scope="col">Email</th>}
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminData &&
                      adminData.map((val) => (
                        <tr key={val.ADMIN_ID}>
                          {!isMobile && (
                            <td>
                              <img
                                className="admin_avtar mb-3"
                                src={createImageFromInitials(
                                  40,
                                  val.ADMIN_NAME,
                                  getRandomColor()
                                )}
                                alt={val.ADMIN_NAME}
                              />
                            </td>
                          )}
                          <td>{val.ADMIN_NAME}</td>
                          {!isMobile && <td>{val.ADMIN_EMAIL}</td>}
                          <td>
                            <button
                              disabled={
                                admin_data.admin_email === val.ADMIN_EMAIL
                                  ? true
                                  : false
                              }
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(val.ADMIN_ID)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RegisterForm id="adminModal" submit={(data) => setAdmin(data)} />
      <PasswordForm
        id="passwordModal"
        email={admin_data && admin_data.admin_email}
      />
    </>
  );
}

export default Dashboard;
