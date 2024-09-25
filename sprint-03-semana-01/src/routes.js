import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/upload.js";
import SessionController from "./controllers/SessionController.js";
import HouseController from "./controllers/HouseController.js";

const routes = new Router();
const upload = multer(uploadConfig);

routes.post("/session", SessionController.store);

routes.post("/houses", upload.single("thumbnail"), HouseController.store);
export default routes;
