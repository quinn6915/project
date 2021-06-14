import { BrowserRouter as Router, Switch } from "react-router-dom";
import Acceuil from "../components/Accueil";
import Login from "../components/Login";
import Register from "../components/Register";
import { AppRoute, PrivateRoute } from "../router/PrivateRoute";
import ProvideAuth from "../router/ProvideAuth";
import LoginPage from "../layout/LoginPage";
import PrivatePage from "../layout/PrivatePage";
import Car from "../components/car/Car";

export default function App() {
  return (
    <ProvideAuth>
      <div className="flex flex-row">
        <div className=" w-3/5 ">
          <Car />
        </div>
        <div className="w-2/5 mt-12 ">
          <Router>
            <Switch>
              <AppRoute exact path="/" layout={LoginPage} component={Login} />
              <AppRoute
                path="/register"
                layout={LoginPage}
                component={Register}
              />
              <PrivateRoute
                path="/accueil"
                layout={PrivatePage}
                component={Acceuil}
              />
            </Switch>
          </Router>
        </div>
      </div>
    </ProvideAuth>
  );
}
