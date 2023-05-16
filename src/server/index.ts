import express from "express";
import morgan from "morgan";
import robotsRouter from "./routers/robotRouter/robotsRouter.js";
import { generalError, notFoundError } from "./middlewares/errorMiddlewares.js";
import userRouter from "./routers/userRouter/userRouter.js";
import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "https://202304-w7ch1-carles-pueyo-front.netlify.app",
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.use(cors(options));

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.use("/user", userRouter);

app.use("/robots", robotsRouter);

app.use(notFoundError);

app.use(generalError);

export default app;
