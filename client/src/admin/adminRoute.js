import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import { useData } from "../contexts/GetData";
import { getCurrentUser, logout } from "../services/auth.service";
import NavBar from "./components/navBar";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/dashboard";
import Results from "./pages/Admin_Results";
import Schedule from "./pages/Admin_schedule";
import Admin_tips from "./pages/Admin_tips";

function AdminRoute() {
  const { isMobile, api } = useData();
  const { path } = useRouteMatch();

  const token = getCurrentUser();
  if (token !== null) {
    const decodedToken = jwt_decode(token.token);
    const currentDate = new Date();

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      Swal.fire({
        title: "Session Expired !!!",
        text: "Login again to continue.",
        icon: "error",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
      });
      logout();
      window.location.reload();
    } else {
      api.defaults.headers.common = { Authorization: `Bearer ${token.token}` };
    }
  }

  return (
    <>
      {localStorage.getItem("user") !== null ? (
        <>
          {isMobile && <NavBar />}
          <div className="container-fluid">
            <div className="row">
              <Sidebar />

              <main
                role="main"
                className="col-md-9 ml-sm-auto col-lg-10 px-md-5"
              >
                <Switch>
                  <Route exact path={path} component={Dashboard} />

                  <Route exact path={`${path}/result`} component={Results} />

                  <Route exact path={`${path}/schedule`} component={Schedule} />

                  <Route path={`${path}/tips`} exact component={Admin_tips} />
                </Switch>
              </main>
            </div>
          </div>
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

export default AdminRoute;
