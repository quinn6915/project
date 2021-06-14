import Modal from "react-modal";
import { FC, useState } from "react";
import "../../css/style.css";
import { useAddCar } from "../../services/AddCar";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { authType } from "../../CostumType";
import { delUser } from "../../store/User";
import { TOKEN } from "../../constants/config";

Modal.setAppElement("#root");

const CreateCar: FC = () => {
  const { form, handleChange, handleChangeFile, submit } = useAddCar();
  const user = useAppSelector((state) => state.user.user);

  let history = useHistory();
  let auth = useAuth() as authType;
  const dispatch = useAppDispatch();

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="flex flex-col justify-center mt-8">
        <p className="text-xl">Bonjour {user?.name} !</p>
        <div className="flex">
          <input
            type="submit"
            onClick={openModal}
            value="Publier une voiture"
            className="bg-black text-white  hover:bg-gray-700 p-2 m-4 rounded-lg w-1/3"
          />
          <button
            className="bg-gray-500  text-white p-2 m-4 rounded-lg w-1/3"
            onClick={() => {
              auth.signout(() => {
                dispatch(delUser());
                localStorage.removeItem(TOKEN);
                history.push("/");
              });
            }}
          >
            Se déconnecter
          </button>
        </div>
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full m-auto relative top-8"
          overlayClassName="overlay"
          contentLabel="Example Modal"
        >
          <form onSubmit={(e) => submit(e, closeModal)}>
            <div className="bg-white pb-4">
              <h3 className="flex text-lg py-4 font-medium text-gray-900 items-center justify-center">
                Ajouter une nouvelle voiture
              </h3>
              <hr />
              <div className="sm:flex sm:items-start mx-4">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full ">
                  <div className="mt-2">
                    <div className="md:flex flex-row md:space-x-4 w-full ">
                      <div className="mb-3 space-y-2 w-full ">
                        <label className="font-semibold text-gray-600 py-2">
                          Titre
                        </label>
                        <input
                          required
                          placeholder="Titre"
                          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-12 px-4"
                          type="text"
                          name="title"
                          onChange={handleChange}
                          value={form.title}
                        />
                      </div>
                    </div>
                    <div className="flex-auto w-full mb-1space-y-2">
                      <label className="font-semibold text-gray-600 py-2">
                        Description
                      </label>
                      <textarea
                        required
                        className="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4"
                        placeholder="Description"
                        name="description"
                        onChange={handleChange}
                        value={form.description}
                      ></textarea>
                    </div>
                    <div className="md:flex flex-row md:space-x-4 w-full ">
                      <div className="mb-3 space-y-2 w-full ">
                        <label className="font-semibold text-gray-600 py-2">
                          Image
                        </label>
                        <input
                          required
                          type="file"
                          placeholder="Image"
                          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-12 px-4"
                          onChange={handleChangeFile}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Ajouter
              </button>
              <button
                onClick={closeModal}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Annuler
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default CreateCar;
