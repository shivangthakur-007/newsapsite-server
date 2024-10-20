import { Router } from "express";
import getblogsproducts from "../controllers/blogs.controller.js";

const blogrouter= Router();

blogrouter.route("/:query/:querytitle/:querylang").get(getblogsproducts);

export default blogrouter;