import { config } from "dotenv";
config();
import cloudinary from "cloudinary";
import connectionTodb from "./Config/dbConnection.js";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.listen(PORT, async () => {
  await connectionTodb();
  console.log(`Port run successfully ${PORT}`);
});
