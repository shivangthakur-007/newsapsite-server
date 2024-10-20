import axios from "axios";
import appError from "../utils/error.Utils.js";


const getblogsproducts = async (req, res, next) => {
  try {
    const { query, querytitle, querylang } = req.params;
    const apiKey = process.env.NEWS_API_KEY || process.env.BLOGS_API; // Use environment variables for the API key

    // Fetching news articles based on query, query title, and language
    const newsapi = await axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        q: query, // Search for the keyword in the body of the article
        qInTitle: querytitle, // Search for the keyword in the title
        language: querylang, // Restrict the language of the articles
        apiKey: apiKey, // API key from environment variable
      },
    });

    // Responding with the news data
    res.json(newsapi.data);
  } catch (e) {
    // console.log(e.message)
    return next(new appError(e.message, 400)); // Handling errors
  }
};

export default getblogsproducts;
