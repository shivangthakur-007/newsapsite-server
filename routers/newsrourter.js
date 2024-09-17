import { Router } from "express";
import {
  // addNews,
  createNews,
  getallNewsapsite,
  getnewsbyId,
  removeNews,
  searchquerybycategory,
  updateNews,
} from "../controllers/newsController.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/")
  .get(getallNewsapsite)
  .post(upload.single("thumbnail"), createNews);

router.route("/:category").get(searchquerybycategory);
router.route("/:id").get(getnewsbyId).put(updateNews).delete(removeNews);
// .post(upload.single("thumbnail"), addNews);

export default router;
