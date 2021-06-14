import { useHistory } from "react-router-dom";
import { TOKEN } from "../constants/config";
import { useAuth } from "../context/Auth";
import { authType } from "../CostumType";
import { useAppDispatch } from "../hooks";
import { delUser } from "../store/User";

export function AuthButton() {
  let history = useHistory();
  let auth = useAuth() as authType;
  const dispatch = useAppDispatch();

  return auth.user ? (
    <p className="flex justify-center">
      Welcome! <span>🔥</span>
      <button
        onClick={() => {
          auth.signout(() => {
            dispatch(delUser());
            localStorage.removeItem(TOKEN);
            history.push("/");
          });
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p className="flex justify-center mt-1">Vous n'êtes pas authentifié</p>
  );
}
