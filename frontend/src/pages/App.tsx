import { BrowserRouter as Router, Switch } from "react-router-dom";
import Acceuil from "../components/Accueil";
import Login from "../components/Login";
import Register from "../components/Register";
import { AppRoute, PrivateRoute } from "../router/PrivateRoute";
import ProvideAuth from "../router/ProvideAuth";
import LoginPage from "../layout/LoginPage";
import PrivatePage from "../layout/PrivatePage";
import Car from "../components/car/Car";
import LoadingBar from "react-top-loading-bar";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import socketClient from "socket.io-client";
import { URL_API } from "../constants/config";

export default function App() {
  const [loading, setLoading] = useState<Boolean>(true);
  const ref = useRef<any>(null);

  useEffect(() => {
    ref.current?.continuousStart();
    setTimeout(() => {
      console.log("...loading something");
      ref.current.complete();
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <ProvideAuth>
      <LoadingBar color="#f11946" ref={ref} />
      {loading ? (
        ""
      ) : (
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
      )}
    </ProvideAuth>
  );
}
