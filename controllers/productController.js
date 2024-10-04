import ProductStore from "../models/productmodel.js";
import appError from "../utils/error.Utils.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

const createProducts = async function (req, res, next) {
  try {
    const { category, name, review, Role, price } = req.body;

    const product = await ProductStore.create({
      image: {
        public_id: "Dummy",
        secure_url: "Dummy",
      },
      category,
      name,
      review,
      Role,
      price,
    });

    if (!product) {
      return next(new appError("Could not be created, Please try again", 500));
    }
    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "estore",
        });
        if (result) {
          product.image.public_id = result.public_id;
          product.image.secure_url = result.secure_url;
        }
        fs.rm(`uploads/${req.file.filename}`);
      } catch (e) {
        return next(new appError(e.message, 400));
      }
    }
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product created Successfully",
      product,
    });
  } catch (e) {
    return next(new appError(e.message, 400));
  }
};

export default createProducts;
