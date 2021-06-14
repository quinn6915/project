import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { authType } from "../CostumType";

export const AppRoute: React.ComponentType<any> = ({
  component: Component,
  layout: Layout,
  ...rest
}) => {
  let auth = useAuth() as authType;

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.user ? (
          <Redirect
            to={{
              pathname: "/accueil",
              state: { from: props.location },
            }}
          />
        ) : (
          <Layout>
            <Component {...props} />
          </Layout>
        )
      }
    ></Route>
  );
};

export const PrivateRoute: React.ComponentType<any> = ({
  component: Component,
  layout: Layout,
  ...rest
}) => {
  let auth = useAuth() as authType;
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.user ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
