import Newsapsite from "../models/newsmodel.js";
import appError from "../utils/error.Utils.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

const getallNewsapsite = async function (req, res, next) {
  // const { query } = req.query;
  // if (query) {
  try {
    // Get the page and limit from the query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    // Calculate the number of news to skip
    const skip = (page - 1) * limit;

    // Fetch the data from the database 
    const news = await Newsapsite.find({}).skip(skip).limit(limit);

    // Get the total number of news for pagination metadata
    const total = await Newsapsite.countDocuments();

    // const news = await Newsapsite.find({});
    res.status(200).json({
      success: true,
      message: "All News which is searched",
      news,
    });
  } catch (e) {
    return next(new appError(e.message, 500));
  }
};



const searchquerybycategory = async (req, res, next) => {
  const { category } = req.params;
  try {
    // Find articles matching the category parameter
    const news = await Newsapsite.find({ category });

    res.status(200).json({
      success: true,
      message: "Search results",
      news,
    });
  } catch (error) {
    next(new appError(error.message, 500)); // Assuming you have an AppError class
  }
};

const createNews = async (req, res, next) => {
  try {
    const { title, description, category, createdby } = req.body;
    const news = await Newsapsite.create({
      thumbnail: {
        public_id: "dummy",
        secure_url: "dummy",
      },
      title,
      description,
      category,
      createdby,
    });

    if (!news) {
      return new appError(e.message, 500);
    }
    // console.log("result>", JSON.stringify(req.file));
    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "newsapsite",
        });
        if (result) {
          news.thumbnail.public_id = result.public_id;
          news.thumbnail.secure_url = result.secure_url;
        }
        fs.rm(`uploads/${req.file.filename}`);
      } catch (e) {
        return next(new appError(e.message, 400));
      }
    }
    await news.save();
    res.status(200).json({
      success: true,
      message: "News Created Successfully",
      news,
    });
  } catch (e) {
    return next(new appError(e.message, 400));
  }
};

const getnewsbyId = async function (req, res, next) {
  try {
    const { id } = req.params;
    const news = await Newsapsite.findById(id);
    if (!news) {
      console.log(next(new appError(e.message, 400)));
    }
    console.log(news.title);
    res.status(200).json({
      success: true,
      message: "news fetched successfully",
      news,
    });
  } catch (e) {
    return next(new appError(e.message, 500));
  }
};

const updateNews = async (req, res, next) => {
  try {
    const id = req.params;
    const news = await Newsapsite.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        runValidators: true,
      }
    );
    if (!news) {
      return next(new appError("Course with given id does not exist"));
    }
  } catch (e) {
    return next(new appError(e.message, 500));
  }
};

const removeNews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const news = await Newsapsite.findById(id);

    if (!news) {
      return next(new appError(e.message, 500));
    }
    await Newsapsite.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "News deleted successfully",
      news,
    });
  } catch (e) {
    return next(new appError(e.message, 500));
  }
};

// const addNews = async (req, res, next) => {
//   try {
//     const { thumbnail, title, description } = req.body;

//     const { id } = req.params;
//     const news = await Newsapsite.findById(id);
//     if (!news) {
//       return next(new appError(e.message, 501));
//     }

//     const newsdata = {
//       thumbnail,
//       title,
//       description,
//       category,
//       createdby,
//     };
//     console.log("result>", JSON.stringify(req.file));
//     if (req.file) {
//       try {
//         const result = await cloudinary.v2.uploader.upload(req.file.path, {
//           folder: "newsapsite",
//         });

//         if (result) {
//           newsdata.thumbnail.public_id = result.public_id;
//           newsdata.thumbnail.secure_url = result.secure_url;
//         }
//         fs.rm(`uploads/${req.file.filena}`);
//       } catch (e) {
//         return next(new appError(e.message, 501));
//       }
//     }

//     console.log(newsdata);
//     news.title.push(newsdata);
//     news.numberofTitle = news.title.length;

//     await news.save();
//     res.status(200).json({
//       success: true,
//       message: "News successfully added to the course",
//       news,
//     });
//   } catch (e) {
//     return next(new appError(e.message, 501));
//   }
// };

export {
  getallNewsapsite,
  searchquerybycategory,
  getnewsbyId,
  createNews,
  updateNews,
  removeNews,
  // addNews,
};
