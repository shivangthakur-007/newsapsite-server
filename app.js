import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.middleware.js";
import newsRouter from "./routers/newsrourter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ "Access-Control-Allow-Origin": "*"}));

app.use(cookieParser());
app.use(morgan("dev"));

app.use("/ping", (req, res) => {
  res.send("Pong");
});

app.use("/api/vi/news", newsRouter);

app.all("*", (req, res) => {
  res.status(404).send("Oops Page Not found");
});
app.use(errorMiddleware);

export default app;
