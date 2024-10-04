import { Router } from "express";
// import getProducts from "../controllers/productController";
import upload from "../middlewares/multer.middleware.js";
import createProducts from "../controllers/productController.js";

const router = Router();

router.route("/").post(upload.single("image"), createProducts);

export default router