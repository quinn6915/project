import { Link, useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
import { authType } from "../CostumType";
import { useAuth } from "../context/Auth";
import { SyntheticEvent } from "react";
import { useProvideAuth } from "../services/Auth";
import { useAppDispatch } from "../hooks";
import { getUser } from "../store/User";
import { TOKEN } from "../constants/config";
import { useToasts } from "react-toast-notifications";

interface LocationState {
  from: Location;
}

export default function Login() {
  const { addToast } = useToasts();

  const dispatch = useAppDispatch();
  let history = useHistory();
  let location = useLocation<LocationState>();
  let auth = useAuth() as authType;
  const { form, handleChange, connect } = useProvideAuth();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = (e: SyntheticEvent) => {
    e.preventDefault();
    const result = connect();

    result.then(function (result) {
      if (!result.error) {
        auth.signin(() => {
          dispatch(getUser({ userId: result.userId, name: result.name }));
          localStorage.setItem(TOKEN, result.token);
          history.replace(from);
          addToast("Bienvenue", {
            appearance: "success",
            autoDismiss: true,
          });
        });
      } else
        addToast(result.error, {
          appearance: "warning",
          autoDismiss: true,
        });
    });
  };

  return (
    <>
      <form
        onSubmit={login}
        className="md:flex flex-col items-center justify-center "
      >
        <p className="text-lg">Connecter vous!</p>
        <div className="mb-3 space-y-2 md:flex flex-col w-2/3  ">
          <label className="font-semibold text-gray-600 py-2">Nom</label>
          <input
            required
            placeholder="Nom"
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-12 px-4"
            name="name"
            onChange={handleChange}
            value={form.name}
          />
        </div>
        <div className="mb-3 space-y-2 md:flex flex-col w-2/3 ">
          <label className="font-semibold text-gray-600 py-2">Password</label>
          <input
            required
            placeholder="mot de passe"
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-12 px-4"
            type="password"
            name="password"
            onChange={handleChange}
            value={form.password}
          />
        </div>
        <input
          type="submit"
          value="Se connecter"
          className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 my-4 rounded-lg  w-2/3"
        />
      </form>
      <ul className="flex justify-center">
        <Link to="/register" className="underline">
          créer un compte
        </Link>
      </ul>
    </>
  );
}
