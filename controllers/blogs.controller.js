import axios from "axios";
import appError from "../utils/error.Utils.js";

const apiKey = process.env.BLOGS_API || "hello";

const getblogsproducts = async (req, res, next) => {
  try {
    const newsapi = await axios.get(
      `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${'df65911b8de94aa5a5922783f305d607'}`
    );
    res.json(newsapi.data);
  } catch (e) {
    return next(new appError(e.message, 400));
  }
};

export default getblogsproducts;
