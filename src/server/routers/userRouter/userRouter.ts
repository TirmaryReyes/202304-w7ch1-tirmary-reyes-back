import { Router } from "express";
import userLogin from "../../controllers/user/userControllers.js";

const userRouter = Router();

userRouter.post("/login", userLogin);

export default userRouter;
