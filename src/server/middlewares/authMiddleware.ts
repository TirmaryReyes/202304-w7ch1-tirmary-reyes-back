import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import CustomError from "../CustomError.js";
import jwt from "jsonwebtoken";

const debug = createDebug("robots-api:root:server:middlewares:authMiddleare");

const secretKey = process.env.JWT_SECRET!;

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader?.includes("Bearer")) {
      const error = new CustomError(401, "Missing token");
      throw error;
    }

    const token = authorizationHeader.replace("Bearer ", "");

    if (!secretKey) {
      debug("Missing key environment variable");
      process.exit(1);
    }

    jwt.verify(token, secretKey);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default auth;
