import axios from "axios";
import { TOKEN, URL_API } from "../constants/config";
import { CarType, CommentType, UserType } from "./types";

const token = localStorage.getItem(TOKEN);
axios.defaults.headers.common = { Authorization: token ? `${token}` : "" };

const config = { headers: { "Content-Type": "multipart/form-data" } };

export async function register(form: UserType) {
  return await axios
    .post(`${URL_API}/user/register`, form)
    .then((res) => res.data)
    .catch((error) => error);
}

export async function login(form: UserType) {
  return await axios.post(`${URL_API}/user/login`, form);
}

export async function isLogged(token: string | null) {
  return await axios
    .post(`${URL_API}/user/isLogged`)
    .then((res) => res.data)
    .catch((error) => error);
}

export async function getAllCar() {
  return await axios
    .get(`${URL_API}/car`)
    .then((res) => res.data)
    .catch((error) => error);
}

export async function createCar(form: CarType) {
  let data = new FormData() as any;
  data.append("car", JSON.stringify(form));
  data.append("image", form.file, form.title);
  return await axios
    .post(`${URL_API}/car`, data, config)
    .then((res) => res.data)
    .catch((error) => error);
}

export async function comment(form: CommentType, id: String) {
  return await axios
    .put(`${URL_API}/car/comment/${id}`, form)
    .then((res) => res.data)
    .catch((error) => error);
}
