import {Schema, model } from "mongoose";

const newsapsite = new Schema(
  {
    thumbnail: {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
    title: {
      type: String,
      required: [true, "name is required"],
      minLength: [8, "Title must be atleast 8 characters"],
      maxLength: [100, "Title should be less than 100 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Name is required"],
      minLength: [5, "Description must be atleast 5 characters"],
      maxLength: [500, "Description should be less than 500 characters."],
      trim: true,
    },
    category:{
      type: String,
      required: [true, "Category is required"]
    },
    numberofTitle: {
      type: Number,
      default: 0,
    },
    createdby: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Newsapsite= new model("Newsapsite", newsapsite)
export default Newsapsite;
