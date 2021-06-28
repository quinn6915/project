import { Link } from "react-router-dom";
import { useRegister } from "../services/Register";

export default function Register() {
  const { form, handleChange, submit } = useRegister();

  return (
    <>
      <form
        onSubmit={submit}
        className="md:flex flex-col items-center justify-center "
      >
        <p className="text-lg">Créer votre compte!</p>
        <div className="mb-3 space-y-2 md:flex flex-col w-2/3  ">
          <label className="font-semibold text-gray-600 py-2">Nom</label>
          <input
            required
            placeholder="entrez votre nom"
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-12 px-4"
            name="name"
            onChange={handleChange}
            value={form.name}
          />
        </div>
        <div className="mb-3 space-y-2 md:flex flex-col w-2/3 ">
          <label className="font-semibold text-gray-600 py-2">
            Mot de passe
          </label>
          <input
            required
            placeholder="entrez le mot de passe"
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-12 px-4"
            type="password"
            name="password"
            onChange={handleChange}
            value={form.password}
          />
        </div>
        <div className="mb-3 space-y-2 md:flex flex-col w-2/3 ">
          <label className="font-semibold text-gray-600 py-2">
            Comfirmer le mot de passe
          </label>
          <input
            required
            placeholder="retapez le mot de passe"
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-12 px-4"
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={form.confirmPassword}
          />
        </div>
        <input
          type="submit"
          value="S'enregistrer"
          className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 my-4 rounded-lg  w-2/3"
        />
      </form>
      <ul className="flex justify-center">
        <Link to="/" className="underline">
          Se connecter
        </Link>
      </ul>
    </>
  );
}
