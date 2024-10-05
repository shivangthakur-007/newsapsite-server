import { model, Schema } from "mongoose";

const ProductSchema = new Schema({
  image: {
    public_id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    maxlength: [30, "Category upto 30 characters."],
    trim: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [4, "Name atleast 4 characters."],
    trim: true,
  },
  review: { type: Number, default: 0 },
  Role: { type: String, enum: ["USER", "ADMIN"], default: "ADMIN" },
  price: { type: Number, default: 0 },
});

const ProductStore = model("Productstore", ProductSchema);
export default ProductStore;    
// const numbers = [10, 15, 20, 30];

// let a = 0;
// for (const i of numbers) {
//   a += i;
// }

// // console.log(a);
// const height = [1.7, 1.65, 1.8, 1.6, 1.75];
// const weight = [30, 55, 90, 102, 65];

// let bmi = 0;
// for (let i = 0; i < height.length; i++) {
//   bmi = (weight[i] / Math.pow(height[i], 2)).toFixed(2);
//   if (bmi < 18.5) {
//     console.log(bmi, "Underweight");
//   } else if (bmi > 18.5 && bmi < 24.9) {
//     console.log(bmi, "Normal weight");
//   } else if (bmi > 25 && bmi < 29.9) {
//     console.log(bmi, "Overweight");
//   } else if (bmi > 30) {
//     console.log(bmi, "Obese");
//   }
// }
