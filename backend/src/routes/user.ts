import express, { Router } from "express";
import { isLogged, login, register } from "../controllers/User";

const router: Router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/isLogged", isLogged);
export { router as routerUser };
