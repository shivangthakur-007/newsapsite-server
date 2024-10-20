import { Router } from "express";
import getblogsproducts from "../controllers/blogs.controller.js";

const blogrouter= Router();

blogrouter.route('/').get(getblogsproducts);

export default blogrouter;