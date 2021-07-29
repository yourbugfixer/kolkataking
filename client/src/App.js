import { Redirect, Route, Switch } from "react-router-dom";
import Admin from "./admin/adminRoute";
import Login from "./admin/components/Login";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/home/Home";
import PattList from "./Pages/PattList";
import Results from "./Pages/Results";
import Tips from "./Pages/Tips";
import Error from "./Pages/Error";
import GetdataProvider from "./contexts/GetData";

function App() {
  return (
    <GetdataProvider>
      <Switch>
        <Route path="/404-notfound" component={Error} />
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={Login} />

        <Route
          path="/"
          component={({ match }) => (
            <div>
              <Navbar />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/pattilist" component={PattList} />
                <Route path="/results/:month?/:year?" component={Results} />
                <Route path="/tips" component={Tips} />
                <Redirect to="/404-notfound" />
              </Switch>
              <Footer />
            </div>
          )}
        />
      </Switch>
    </GetdataProvider>
  );
}

export default App;
