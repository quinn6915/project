import express, { Router } from "express";
import {
  comment,
  create,
  deleteCar,
  getAll,
  getOne,
  modify,
} from "../controllers/Car";
import multer from "../middleware/ConfigMulter";

const router: Router = express.Router();

router.post("/", /*multer,*/ create);
router.put("/:id", modify);
router.delete("/:id", deleteCar);
router.get("/:id", getOne);
router.get("/", getAll);
router.put("/comment/:id", comment);

export { router as routerCar };
