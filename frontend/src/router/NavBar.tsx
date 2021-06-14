import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <ul className="flex justify-center">
        <Link to="/register">créer un compte</Link>
      </ul>
    </>
  );
}
